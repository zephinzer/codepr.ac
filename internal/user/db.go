package user

import (
	"database/sql"
	"fmt"

	"gitlab.com/zephinzer/codepr.ac/internal/db"
)

const (
	TableUser = "user"
)

var MySQLMigrations = []string{
	fmt.Sprintf("ALTER TABLE `%s` ADD username VARCHAR(32) NOT NULL", TableUser),
	fmt.Sprintf("ALTER TABLE `%s` ADD email VARCHAR(256) NOT NULL", TableUser),
	fmt.Sprintf("ALTER TABLE `%s` ADD display_name VARCHAR(64)", TableUser),
	fmt.Sprintf("ALTER TABLE `%s` ADD website TEXT", TableUser),
}

var dbConnection *sql.DB
var dbError error

func init() {
	dbConnection, dbError = db.Init("user")
}

func Migrate() error {
	if dbError != nil {
		return fmt.Errorf("database has not been initialised: %s", dbError)
	}
	if initError := db.InitTable(TableUser, dbConnection); initError != nil {
		return fmt.Errorf("database table could not be initialised: %s", initError)
	}
	if migrateError := db.ApplyMigrations(TableUser, MySQLMigrations); migrateError != nil {
		return fmt.Errorf("database schema migration failed: %s", migrateError)
	}
	return nil
}
