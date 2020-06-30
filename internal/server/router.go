package server

import (
	"strings"

	"github.com/gorilla/mux"
	"gitlab.com/zephinzer/codepr.ac/internal/log"
	"gitlab.com/zephinzer/codepr.ac/internal/session"
)

func GetRouter() *mux.Router {
	router := mux.NewRouter()
	currentEndpoint := "/session/github"
	currentMethods := []string{"GET", "POST"}
	log.Infof("registering %s endpoint: %s", strings.Join(currentMethods, "/"), currentEndpoint)
	router.
		Path(currentEndpoint).
		Methods(currentMethods...).
		HandlerFunc(session.HandleGithubLogin)

	currentEndpoint = "/session/github/callback"
	currentMethods = []string{"GET"}
	log.Infof("registering %s endpoint: %s", strings.Join(currentMethods, "/"), currentEndpoint)
	router.
		Path(currentEndpoint).
		Methods(currentMethods...).
		HandlerFunc(session.HandleGithubOAuthCallback)
	return router
}
