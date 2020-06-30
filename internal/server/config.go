package server

import (
	c "github.com/usvc/go-config"
)

const (
	ServerPort = "server-port"
	ServerAddr = "server-addr"
)

var config = c.Map{
	ServerPort: &c.Uint{
		Default: 30000,
	},
	ServerAddr: &c.String{
		Default: "0.0.0.0",
	},
}
