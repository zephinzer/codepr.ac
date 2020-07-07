<center>
  <img alt="Codeprac" src="assets/images/logo-light-bg-1000.png" />
</center>

# Codeprac

[![pipeline status](https://gitlab.com/zephinzer/codepr.ac/badges/master/pipeline.svg)](https://gitlab.com/zephinzer/codepr.ac/-/commits/master)

A service for reviewing design decisions made in code.

> The inspiration for this service is: I've found it useful over the years to redo simple applications I've written in the past. Relooking over past code and what I just wrote gave me an idea of my progress through evaluating what I now consider important compared to what I used to consider important. I wished there was a better way to remember why I wrote what I did instead of relying on a README.md.

# Target use cases

| Target Group | Primary Use Case |
| --- | --- |
| New developers | Practice creating real-world applications over solving algorithms |
| Growing developers | Review your progress through the years by practicing re-writing basic applications |
| Technical interviewers | Review design decisions made in code written by candidates |



- - -



# Deployment



## Application


### Configuring the backend (AKA `api`)

The backend variables should be present on the service's host system at runtime. If running in a Docker container, remember to add these as environment variables.

| Key | Default | Description |
| --- | --- | --- |
| `GITHUB_CLIENT_ID` | `""` | Github application Client ID |
| `GITHUB_CLIENT_SECRET` | `""` | Github application Client Secret |
| `GITHUB_REDIRECT_URI` | `""` | Github application Redirect URI that you specified when creating the Github application |
| `LOGIN_URL` | `""` | Frontend URL |
| `SERVER_ADDR` | `"0.0.0.0"` | Interface address which the server should bind to |
| `SERVER_PORT` | `30000` | Port which the server should listen on |

### Configuring the frontend (AKA `ui`)

The frontend variables are injected at build-time and should be defined in the delivery pipeline.

| Key | Default | Description |
| --- | --- | --- |
| `REACT_APP_API_URL_BASE` | `"http://localhost:30000"` | Base URL to the API server |


## Infrastructure


### Required stuff for provisioning infrastructure

**Accounts**
- [Gitlab account](#gitlab-account)
- [Digital Ocean account](#digital-ocean-account)

**Software**
- [Terraform](#terraform)
- [Direnv](#direnv)


### Configuring the infrastructure

**Navigate to the Terraform module for this project at `./deploy/do`**. All commands assume running `make` in that directory and **not the project root**.

1. Setup an SSH key-pair using `make .keys`
2. Setup the backend configuration using `make .backend-config`
3. Setup your Digital Ocean token using `make .envrc` and filling up your Digital Ocean API token in the generated `.envrc` before running `direnv allow .` to enable usage of the `.envrc`. You can find your API token from [https://cloud.digitalocean.com/account/api/tokens](https://cloud.digitalocean.com/account/api/tokens).
4. Run `make init` to initialise the Terraform backend
5. Run `make plan` to show changes to the infrastructure
6. Run `make apply` to apply the changes for the first time
7. Run `make down` for subsequent runs to bring down the API server only
8. Run `make up` for subsequent runs to bring up the API server only
9. Run `make destroy` to destroy all infrastructure

### Deploying application on the infrastructure

The supplied user data sets up the server but does not deploy anything. After deployment of the infrastructure, **do the following from the `./deploy/do` directory**:

1. Run `make ssh_api` to gain a shell into the API server
2. Navigate to `~/src`, run `./scripts/init-production.sh`, and fill up the variables
3. From `~/src`, run `docker-compose up -d` to start the application
4. Copy the script at `./scripts/update-service.sh` to `/opt/scripts/update-service.sh` and set the executable flag on it
5. Run `sudo crontab -e` (note: use `sudo`) and add a new line `*/5 * * * * /opt/scripts/update-service.sh`, this enables auto-updating of the production services
6. Copy the script at `./scripts/update-repo.sh` to `~/update-repo.sh` and set the executable flag on it
7. Run `crontab -e` (note: no `sudo`) and add a new line `*/5 * * * * cd /home/codeprac/src && /home/codeprac/update-repo.sh`, this enables auto-updating of the production repository

**Notes**
- To update production instructions, run `make update_repo`
- To update production, run `make update_production`
- To deploy production, run `make deploy_production`

- - -



# Development


## Required stuff for developing locally

**Accounts**
- [Gitlab account](#gitlab-account)
  
**Software**
- [Direnv](#direnv)
- [Docker](#docker)
- [Golang](#golang)
- [Node.js](#nodejsnpm)


## Setting up locally

The following section assumes commands being run **from the project root**.

1. Clone this repository locally
2. Install Node.js dependencies using `npm ci` (or `make ui_deps`)
3. Install Golang dependencies using `go mod vendor` (or `make api_deps`)
4. Start the MySQL database by running `docker-compose -f ./deploy/db/docker-compose.yml up -d` (or `make start_db`). You should be able to access it using `mysql -uuser -ppassword -h127.0.0.1 -P33060 database`.
5. Start the API server by running `go run ./cmd/codeprac start` (or `make start_api`). You should be able to access it at [http://localhost:30000](http://localhost:30000).
      - To test the behaviour with a production build, use `make start_api_production`
6. Start the web application by running `npm start` (or `make start_ui`). You should be able to access it at [http://localhost:3000](http://localhost:3000).
      - To test the behaviour with a production build, use `make start_ui_production` (this uses the `npm` package `serve`, final production uses a Nginx server)


## Configuring the local application

1. Run `make .envrc` and fill up the variables as required in the generated `.envrc` file at the project root and run `direnv allow .`. These variables will be consumed by the API server when running locally


## Building the applications

1. Run `make api_production` or `make api_static_production` to build the application into a binary at `./bin/codeprac_${GOOS}_${GOARCH}`. Requires `go` to be available in your `$PATH`.
2. Run `make ui` to build the web service into a built copy at `./build`/ Requires `node` to be available in your `$PATH`.

**Notes**
- For `make ui` to work properly, ensure that the required `REACT_APP_*` variables are defined at `npm run build`-time

## Packaging the applications

Docker is used to package the production bundle.

1. Run `make api_image` to create the Docker image for the API server
2. Run `make ui_image` to create the Docker image for the web application

**Notes**
- Multistage builds are opted for to avoid including files not intended for production, resulting builds from multistage builds also tend to be leaner

- - -



# Required Stuff


## Accounts


### Gitlab account

The code in this repository is configured to be deployed using Gitlab Pages via Gitlab CI/CD. Sign up for an account at [https://gitlab.com](https://gitlab.com).


### Digital Ocean account

Infrastructure provisioning scripts use Digital Ocean as a provider. To get started, sign up for an account at [https://m.do.co/c/c3b62cf39c7c](https://m.do.co/c/c3b62cf39c7c) (*that's my referral code so that this project may be slightly easier on my pockets*, if you would rather not (cues sad face), you can also sign up from [https://digitalocean.com](https://digitalocean.com)).


## Tools


### Direnv

The `direnv` tool is used in conjunction with Terraform so that API tokens can avoid being checked-in to the repository. To install `direnv`, run:

```sh
# on ubuntu
apt install direnv;

# on macos
brew install direnv;

# on windows
echo "it's complicated";
```

> See [https://github.com/direnv/direnv/issues/343#issuecomment-463502726](https://github.com/direnv/direnv/issues/343#issuecomment-463502726) for Windows installation instructions

Add the hook script as described at [https://github.com/direnv/direnv/blob/master/docs/hook.md](https://github.com/direnv/direnv/blob/master/docs/hook.md).

Verify that `direnv` is available in your `$PATH` by running `which direnv` and `direnv version`.


### Docker

Docker is used to containerise and package the application. To install it, follow the instructions on the following pages:

- Ubuntu: [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)
- MacOS: [https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)
- Windows: [https://docs.docker.com/docker-for-windows/install/](https://docs.docker.com/docker-for-windows/install/)

Verify that `docker` and `docker-compose` are available in your `$PATH` by running `which docker`, `which docker-compose`, `docker version`, and `docker-compose version`.


### Golang

Go is used for the backend server. To install it, run:

```sh
# on ubuntu (ref: https://github.com/golang/go/wiki/Ubuntu)
sudo add-apt-repository ppa:longsleep/golang-backports;
sudo apt-get install golang-go;

# on macos (ref: https://formulae.brew.sh/formula/go)
brew install go;

# on windows (ref: https://chocolatey.org/packages/golang)
choco install golang;
```

Verify the `go` command is available in your `$PATH` by running `which go` and `go version`.


### Node.js/NPM

Node.js is used for frontend work. The official way to install it can be found at [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

The recommended way however is to install NVM which allows you to switch Node versions easily. See the instructions at [https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating).

Verify both `node` and `npm` commands are available in your `$PATH` by running `which node`, `which npm`, `node -v`, and `npm -v`.


### Terraform

Terraform is used to bring up required infrastructure. To install Terraform,

```sh
# on ubuntu
xdg-open 'https://www.terraform.io/downloads.html';

# on macos
brew install terraform;

# on windows
choco install terraform;
```

Or download it from [https://www.terraform.io/downloads.html](https://www.terraform.io/downloads.html).

Full instructions can be found at [https://learn.hashicorp.com/terraform/getting-started/install.html](https://learn.hashicorp.com/terraform/getting-started/install.html).

Verify the `terraform` command is available in your `$PATH` by running `which terraform` and `terraform version`.

- - -


# Licensing

To-be-decided.
