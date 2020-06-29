package main

import (
	"gitlab.com/zephinzer/codepr.ac/cmd/codeprac/version"
)

var (
	Version   string
	Commit    string
	Timestamp string
)

func main() {
	cmd := GetCommand()
	cmd.AddCommand(version.GetCommand(Version, Commit, Timestamp))
	cmd.Execute()
}
