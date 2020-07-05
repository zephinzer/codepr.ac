#!/bin/bash
# this script is a modified adaptaion from https://github.com/do-community/automated-setups/blob/master/Ubuntu-18.04/initial_server_setup.sh
# the intention of this script is to ensure a base level of system security and usability
set -euo pipefail;
echo "started" > /userdata-steps;

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
echo "configuration has been set" >> /userdata-steps;

# Hardening
# ---------

# Add sudo user and grant privileges
useradd --create-home --shell "/bin/bash" --groups sudo "${USERNAME}";
echo "user ${USERNAME} has been created" >> /userdata-steps;

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
echo "password reset has been configured" >> /userdata-steps;

# Create SSH directory for sudo user
home_directory="$(eval echo ~${USERNAME})";
mkdir --parents "${home_directory}/.ssh";
echo "sudo access has been configured" >> /userdata-steps;

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
echo "ssh access has been configured" >> /userdata-steps;

# Disable root SSH login with password
sed --in-place 's/^PermitRootLogin.*/PermitRootLogin prohibit-password/g' /etc/ssh/sshd_config;
sed --in-place "s/^#Port 22/Port ${SSHD_PORT}/g" /etc/ssh/sshd_config;
sed --in-place 's/^#MaxAuthTries .*/MaxAuthTries 5/g' /etc/ssh/sshd_config;
sed --in-place 's/^#MaxSessions .*/MaxSessions 2/g' /etc/ssh/sshd_config;
systemctl restart sshd;
echo "sshd has been configured" >> /userdata-steps;

# Add exception for SSH and then enable UFW firewall
ufw allow OpenSSH;
ufw allow ${SSHD_PORT}/tcp;
ufw allow 443;
ufw allow 80;
ufw --force enable;
echo "firewall has been configured" >> /userdata-steps;

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
echo "system has been updated" >> /userdata-steps;

# Add proxy
cat << 'EOF' > /etc/nginx/sites-available/default
ssl_session_cache   shared:SSL:10m;
ssl_session_timeout 10m;

server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name _;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  listen [::]:443 ssl;
  ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers         HIGH:!aNULL:!MD5;
  server_name api.codepr.ac;
  location / {
    proxy_pass                          http://localhost:30001/;
    proxy_set_header X-Real-IP          $remote_addr;
    proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto  $scheme;
    proxy_set_header X-Forwarded-Host   $host;
    proxy_set_header X-Forwarded-Port   $server_port;
  }
  # Certbot should insert certificates below this comment
}

server {
  listen 443 ssl;
  listen [::]:443 ssl;
  ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers         HIGH:!aNULL:!MD5;
  server_name www.codepr.ac;
  location / {
    proxy_pass                          http://localhost:3001/;
    proxy_set_header X-Real-IP          $remote_addr;
    proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto  $scheme;
    proxy_set_header X-Forwarded-Host   $host;
    proxy_set_header X-Forwarded-Port   $server_port;
  }
  # Certbot should insert certificates below this comment
}

server {
  listen 443 ssl;
  listen [::]:443 ssl;
  ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers         HIGH:!aNULL:!MD5;
  server_name www.codepr.ac;
  location /* {
    proxy_pass                          http://localhost:3001/;
    proxy_set_header X-Real-IP          $remote_addr;
    proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto  $scheme;
    proxy_set_header X-Forwarded-Host   $host;
    proxy_set_header X-Forwarded-Port   $server_port;
  }
  # Certbot should insert certificates below this comment
}
EOF
certbot --nginx --non-interactive --agree-tos -d api.codepr.ac -m webmaster@codepr.ac;
certbot --nginx --non-interactive --agree-tos -d ui.codepr.ac -m webmaster@codepr.ac;
certbot --nginx --non-interactive --agree-tos -d www.codepr.ac -m webmaster@codepr.ac;
nginx -t;
nginx -s reload;
sed --in-place 's/^127.0.0.1 localhost/127.0.0.1 localhost api.codepr.ac ui.codepr.ac www.codepr.ac/g' /etc/hosts;
echo "nginx has been configured" >> /userdata-steps;

# Open ports
ufw allow 'Nginx HTTP';
ufw allow 'Nginx HTTPS';
ufw allow 30001; # api server
ufw allow 3001; # ui server
ufw reload;
echo "firewall has been updated for application use" >> /userdata-steps;

# Initialise application
git clone https://gitlab.com/zephinzer/codepr.ac.git /home/${USERNAME}/src;
chown ${USERNAME}:${USERNAME} -R /home/${USERNAME}/src;
cd /home/${USERNAME}/src && make api_image && make ui_image;
echo "application has been seeded" >> /userdata-steps;

# Setup fail2ban
cat << EOF > /etc/fail2ban/jail.local
[sshd]
port = ${SSHD_PORT}
enabled = true
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
EOF
systemctl restart fail2ban;
echo "fail2ban has been configured" >> /userdata-steps;

echo "completed successfully" >> /userdata-steps;
