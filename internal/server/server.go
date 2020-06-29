package server

import "net/http"

func GetServer(router http.Handler) http.Server {
	return http.Server{
		Addr:    "0.0.0.0:30000",
		Handler: router,
	}
}
