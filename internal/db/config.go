package db

import (
	c "github.com/usvc/go-config"
)

const (
	MySQLUsername = "mysql-username"
	MySQLPassword = "mysql-password"
	MySQLHostname = "mysql-hostname"
	MySQLDatabase = "mysql-database"
	MySQLPort     = "mysql-port"
)

var Config = c.Map{
	MySQLUsername: &c.String{
		Default: "mysql_user", // default decided based on ./deploy/docker-compose.yml
	},
	MySQLPassword: &c.String{
		Default: "mysql_password", // default decided based on ./deploy/docker-compose.yml
	},
	MySQLHostname: &c.String{
		Default: "localhost", // default decided based on ./deploy/docker-compose.yml
	},
	MySQLDatabase: &c.String{
		Default: "mysql_database", // default decided based on ./deploy/docker-compose.yml
	},
	MySQLPort: &c.Uint{
		Default: 3307, // default decided based on ./deploy/docker-compose.yml
	},
}
