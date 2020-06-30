package server

import (
	"fmt"
	"net/http"

	"gitlab.com/zephinzer/codepr.ac/internal/log"
)

func GetServer(router http.Handler) http.Server {
	config.LoadFromEnvironment()
	listenAddr := fmt.Sprintf("%s:%v", config.GetString(ServerAddr), config.GetUint(ServerPort))
	log.Infof("created server that will bind to %s", listenAddr)
	return http.Server{
		Addr:    listenAddr,
		Handler: router,
	}
}
