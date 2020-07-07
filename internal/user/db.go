package user

import (
	"database/sql"
	"fmt"

	"gitlab.com/zephinzer/codepr.ac/internal/db"
)

const (
	TableUser = "user"
)

var SQLite3Migrations = []string{
	fmt.Sprintf("ALTER TABLE `%s` ADD `notification_id` VARCHAR(32) NOT NULL DEFAULT ''", TableName),
	fmt.Sprintf("ALTER TABLE `%s` ADD `message` TEXT NOT NULL DEFAULT ''", TableName),
	fmt.Sprintf("ALTER TABLE `%s` ADD `raw` TEXT NOT NULL DEFAULT ''", TableName),
	fmt.Sprintf("ALTER TABLE `%s` ADD `hostname` VARCHAR(256) NOT NULL DEFAULT ''", TableName),
}

var dbConnection *sql.DB

func init() {
	dbConnection = db.Init("user")
}

func Migrate() {
	InitTable(TableUser, dbConnection)

}
