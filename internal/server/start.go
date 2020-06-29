package server

import (
	"os"

	"gitlab.com/zephinzer/codepr.ac/internal/log"
)

func Start() {
	s := GetServer(GetRouter())
	if err := s.ListenAndServe(); err != nil {
		log.Errorf("failed to start server: %s", err)
		os.Exit(1)
	}
}
