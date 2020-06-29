package start

import (
	"github.com/spf13/cobra"
	"gitlab.com/zephinzer/codepr.ac/internal/server"
)

func GetCommand() *cobra.Command {
	cmd := cobra.Command{
		Use:   "start",
		Short: "start the codepr.ac api server",
		Long:  "Start the codepr.ac API server",
		Run:   run,
	}
	return &cmd
}

func run(cmd *cobra.Command, args []string) {
	server.Start()
}
