package version

import (
	"fmt"

	"github.com/spf13/cobra"
)

func GetCommand(version, commitHash, timestamp string) *cobra.Command {
	cmd := cobra.Command{
		Use:   "version",
		Short: "displays version information",
		Run: func(command *cobra.Command, args []string) {
			fmt.Printf("codeprac %s-%s / %s\n", version, commitHash, timestamp)
		},
	}
	return &cmd
}
