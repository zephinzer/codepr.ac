package main

import (
	"github.com/spf13/cobra"
)

func GetCommand() *cobra.Command {
	cmd := cobra.Command{
		Use:   "codeprac",
		Short: "runs the codeprac api server",
		Run:   run,
	}
	return &cmd
}

func run(cmd *cobra.Command, args []string) {
	cmd.Help()
}
