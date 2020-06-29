package server

import (
	"net/http"

	"github.com/gorilla/mux"
)

func GetRouter() *mux.Router {
	router := mux.NewRouter()
	router.
		Path("/session/github").
		Methods("POST").
		HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("login via github"))
		})
	return router
}
