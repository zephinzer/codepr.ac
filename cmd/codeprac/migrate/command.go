package migrate

import (
	"os"

	"github.com/spf13/cobra"
	"gitlab.com/zephinzer/codepr.ac/internal/log"
	"gitlab.com/zephinzer/codepr.ac/internal/user"
)

func GetCommand() *cobra.Command {
	cmd := cobra.Command{
		Use: "migrate",
		Run: run,
	}
	return &cmd
}

func run(cmd *cobra.Command, args []string) {
	if migrateError := user.Migrate(); migrateError != nil {
		log.Errorf("failed to perform migrations for user: %s", migrateError)
		os.Exit(1)
	}
}
