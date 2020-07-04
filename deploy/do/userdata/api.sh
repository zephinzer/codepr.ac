#!/bin/bash
# this script is a modified adaptaion from https://github.com/do-community/automated-setups/blob/master/Ubuntu-18.04/initial_server_setup.sh
# the intention of this script is to ensure a base level of system security and usability
set -euo pipefail;

# Configuration
# -------------

# Name of the user to create and grant sudo privileges
USERNAME=codeprac;
# Port to SSH to
SSHD_PORT=26337;
# Whether to copy over the root user's `authorized_keys` file to the new sudo
# user.
COPY_AUTHORIZED_KEYS_FROM_ROOT=true;
# Additional public keys to add to the new sudo user
# OTHER_PUBLIC_KEYS_TO_ADD=(
#     "ssh-rsa AAAAB..."
#     "ssh-rsa AAAAB..."
# )
OTHER_PUBLIC_KEYS_TO_ADD=(
)

# Hardening
# ---------

# Add sudo user and grant privileges
useradd --create-home --shell "/bin/bash" --groups sudo "${USERNAME}";

# Check whether the root account has a real password set
encrypted_root_pw="$(grep root /etc/shadow | cut --delimiter=: --fields=2)";

if [ "${encrypted_root_pw}" != "*" ]; then
    # Transfer auto-generated root password to user if present
    # and lock the root account to password-based access
    echo "${USERNAME}:${encrypted_root_pw}" | chpasswd --encrypted;
    passwd --lock root;
else
    # Delete invalid password for user if using keys so that a new password
    # can be set without providing a previous value
    passwd --delete "${USERNAME}";
fi;

# Expire the sudo user's password immediately to force a change
chage --lastday 0 "${USERNAME}";

# Create SSH directory for sudo user
home_directory="$(eval echo ~${USERNAME})";
mkdir --parents "${home_directory}/.ssh";

# Copy `authorized_keys` file from root if requested
if [ "${COPY_AUTHORIZED_KEYS_FROM_ROOT}" = true ]; then
    cp /root/.ssh/authorized_keys "${home_directory}/.ssh";
fi;

# Add additional provided public keys
for pub_key in "${OTHER_PUBLIC_KEYS_TO_ADD[@]}"; do
    echo "${pub_key}" >> "${home_directory}/.ssh/authorized_keys";
done;

# Adjust SSH configuration ownership and permissions
chmod 0700 "${home_directory}/.ssh";
chmod 0600 "${home_directory}/.ssh/authorized_keys";
chown --recursive "${USERNAME}":"${USERNAME}" "${home_directory}/.ssh";

# Disable root SSH login with password
sed --in-place 's/^PermitRootLogin.*/PermitRootLogin prohibit-password/g' /etc/ssh/sshd_config;
sed --in-place "s/^#Port 22/Port ${SSHD_PORT}/g" /etc/ssh/sshd_config;
sed --in-place 's/^#MaxAuthTries .*/MaxAuthTries 5/g' /etc/ssh/sshd_config;
sed --in-place 's/^#MaxSessions .*/MaxSessions 2/g' /etc/ssh/sshd_config;
systemctl restart sshd;

# Add exception for SSH and then enable UFW firewall
ufw allow OpenSSH;
ufw allow ${SSHD_PORT}/tcp;
ufw allow 443;
ufw --force enable;

# Due diligence
# -------------

# update the system
sudo add-apt-repository -y ppa:certbot/certbot;
apt-get -y update;
apt-get -y upgrade;
apt-get -y autoremove;
apt-get -y install \
  docker.io \
  fail2ban \
  git \
  make \
  python-certbot-nginx \
  python-pip \
  nginx;
pip install docker-compose;
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose;

# Setup fail2ban
cat <<EOF > /etc/fail2ban/jail.local
[sshd]
enabled = true
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
EOF
echo "port = ${SSHD_PORT}" >> /etc/fail2ban/jail.local;
systemctl restart fail2ban;
systemctl enable fail2ban;

# Add application
git clone https://gitlab.com/zephinzer/codepr.ac.git /home/${USERNAME}/src;
chown ${USERNAME}:${USERNAME} -R /home/${USERNAME}/src;
docker-compose -f /home/${USERNAME}/src/deploy/docker-compose.yml build;

# Add proxy
cat <<EOF > /etc/nginx/sites-available/default
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  # server_name api.codepr.ac;
  server_name _;

  location / {
    proxy_pass http://localhost:30001/;
    proxy_set_header X-Real-IP $remote_addr;
  }
  location /ui {
    proxy_pass http://localhost:3001/;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
EOF
nginx -t;
nginx -s reload;
certbot --nginx --non-interactive --agree-tos -d api.codepr.ac -m webmaster@codepr.ac;

# Open ports
ufw allow 'Nginx HTTP';
ufw allow 'Nginx HTTPS';
ufw allow 30001; # api server
ufw allow 3001; # ui server
ufw reload;
