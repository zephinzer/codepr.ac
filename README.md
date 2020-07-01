<center>
  <img alt="Codeprac" src="assets/images/logo-light-bg-1000.png" />
</center>

# Codeprac

A service for reviewing design decisions made in code.

> The inspiration for this service is: I've found it useful over the years to redo simple applications I've written in the past. Relooking over past code and what I just wrote gave me an idea of my progress through evaluating what I now consider important compared to what I used to consider important. I wished there was a better way to remember why I wrote what I did instead of relying on a README.md.

# Target use cases

| Target Group | Primary Use Case |
| --- | --- |
| New developers | Practice creating real-world applications over solving algorithms |
| Growing developers | Review your progress through the years by practicing re-writing basic applications |
| Technical interviewers | Review design decisions made in code written by candidates |

# Configuration

## Configuring the backend

| Key | Default | Description |
| --- | --- | --- |
| `GITHUB_CLIENT_ID` | `""` | Github application Client ID |
| `GITHUB_CLIENT_SECRET` | `""` | Github application Client Secret |
| `GITHUB_REDIRECT_URI` | `""` | Github application Redirect URI that you specified when creating the Github application |
| `LOGIN_URL` | `""` | Frontend URL |
| `SERVER_ADDR` | `"0.0.0.0"` | Interface address which the server should bind to |
| `SERVER_PORT` | `30000` | Port which the server should listen on |

## Frontend

# Development

## Setting up

1. Clone this repository locally
2. Install Node.js dependencies using `npm ci` (or `make ui_deps`)
3. Install Golang dependencies using `go mod vendor` (or `make api_deps`)
4. Start the MySQL database by running `docker-compose -f ./deploy/dev/docker-compose.yml up -d` (or `make start_db`)
5. Start the API server by running `go run ./cmd/codeprac start` (or `make start_api`)
6. Start the web application by running `npm start` (or `make start_ui`)

## Building

1. Run `make api_production` or `make api_static_production` to build the application into a binary at `./bin/codeprac_${GOOS}_${GOARCH}`
2. Run `make ui` to build the web service into a built copy at `./build`

## Packaging

1. Run `make api_image` to create the Docker image for the API server
2. Run `make ui_image` to create the Docker image for the web application

# Licensing

To-be-decided.
