package main

import (
	"gitlab.com/zephinzer/codepr.ac/cmd/codeprac/migrate"
	"gitlab.com/zephinzer/codepr.ac/cmd/codeprac/start"
	"gitlab.com/zephinzer/codepr.ac/cmd/codeprac/version"
	"gitlab.com/zephinzer/codepr.ac/internal/log"
)

var (
	Version   string
	Commit    string
	Timestamp string
)

func init() {
	log.Init(log.LevelDebug)
}

func main() {
	cmd := GetCommand()
	cmd.AddCommand(version.GetCommand(Version, Commit, Timestamp))
	cmd.AddCommand(migrate.GetCommand())
	cmd.AddCommand(start.GetCommand())
	cmd.Execute()
}
