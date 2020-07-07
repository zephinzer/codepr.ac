package db

import (
	"database/sql"
	"fmt"

	godb "github.com/usvc/go-db"
)

// Init creates a database connection
func Init(connectionID string) (*sql.DB, error) {
	Config.LoadFromEnvironment()
	if err := godb.Init(godb.Options{
		ConnectionName: connectionID,
		Username:       Config.GetString(MySQLUsername),
		Password:       Config.GetString(MySQLPassword),
		Hostname:       Config.GetString(MySQLHostname),
		Database:       Config.GetString(MySQLDatabase),
		Port:           uint16(Config.GetUint(MySQLPort)),
	}); err != nil {
		return nil, fmt.Errorf("an error occurred while creating the connection: %s", err)
	}
	return godb.Get(connectionID), nil
}

// InitTable creates 2 tables, one named `tableName` and the other named
// `tableName`_migrations using the provided `connection`; this way of doing things
// distributes the migrations so that each table is independently migratable
// and hence independently removable
func InitTable(tableName string, connection *sql.DB) error {
	var execError error
	_, execError = connection.Exec(fmt.Sprintf(
		"CREATE TABLE IF NOT EXISTS `%s_migrations` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `index` INTEGER UNIQUE NOT NULL, `script` TEXT NOT NULL, `timestamp` TIMESTAMP DEFAULT NOW());",
		tableName,
	))
	if execError != nil {
		return fmt.Errorf("failed to create `%s`'s migrations table: %s", tableName, execError)
	}
	_, execError = connection.Exec(fmt.Sprintf(
		"CREATE TABLE IF NOT EXISTS `%s` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `timestamp` TIMESTAMP DEFAULT NOW());",
		tableName,
	))
	if execError != nil {
		return fmt.Errorf("failed to create `%s`'s logical table: %s", tableName, execError)
	}
	return nil
}
