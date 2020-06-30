package session

import (
	"fmt"
	"net/http"
	"net/url"

	"github.com/google/uuid"
	"gitlab.com/zephinzer/codepr.ac/internal/log"
	"gitlab.com/zephinzer/codepr.ac/internal/response"
	"gitlab.com/zephinzer/codepr.ac/pkg/oauth"
)

func HandleGithubOAuthCallback(w http.ResponseWriter, r *http.Request) {
	authResponse := oauth.AuthorizationResponse{}
	authResponse.LoadFromQuery(r.URL.Query())
	if authResponse.Error != nil {
		errorResponse := response.Error{
			Code:      "AUTHORIZATION_FAILED",
			Message:   authResponse.ErrorDescription,
			RequestID: authResponse.State,
			Data:      authResponse,
		}
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write(errorResponse.Bytes())
		return
	}
	grantRequest := oauth.GrantRequest{
		BaseURL:      config.GetString(GithubGrantURL),
		ClientID:     config.GetString(GithubClientID),
		ClientSecret: config.GetString(GithubClientSecret),
		Code:         authResponse.Code,
		RedirectURI:  config.GetString(GithubRedirectURI),
	}
	grantResponse, err := grantRequest.Do()
	if err != nil {
		errorResponse := response.Error{
			Code:      "GRANT_FAILED",
			Message:   err.Error(),
			RequestID: authResponse.State,
			Data:      err,
		}
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write(errorResponse.Bytes())
		return
	} else if grantResponse.Error != nil {
		errorResponse := response.Error{
			Code:      "GRANT_FAILED",
			Message:   grantResponse.Error.Error(),
			RequestID: authResponse.State,
			Data:      grantResponse,
		}
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write(errorResponse.Bytes())
		return
	}
	loginRedirect, err := url.Parse(config.GetString(LoginURL))
	if err != nil {
		errorResponse := response.Error{
			Code:      "URL_PARSING_FAILED",
			Message:   err.Error(),
			RequestID: authResponse.State,
		}
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(errorResponse.Bytes())
		return
	}
	q := loginRedirect.Query()
	q.Add("access_token", grantResponse.AccessToken)
	loginRedirect.RawQuery = q.Encode()
	wwwRedirect := loginRedirect.String()
	w.Header().Add("Location", wwwRedirect)
	w.WriteHeader(http.StatusTemporaryRedirect)
	w.Write([]byte(fmt.Sprintf("<html><head><title>%s</title></head><body><a href=\"%s\">%s</a></body></html>", wwwRedirect, wwwRedirect, wwwRedirect)))
}

func HandleGithubLogin(w http.ResponseWriter, r *http.Request) {
	config.LoadFromEnvironment()
	requestID := uuid.New().String()
	log.Debugf("received request %s", requestID)
	authRequest := oauth.AuthorizationRequest{
		BaseURL:     config.GetString(GithubAuthURL),
		ClientID:    config.GetString(GithubClientID),
		RedirectURI: config.GetString(GithubRedirectURI),
		Scopes:      []string{"read:user", "user:email", "repo"},
		State:       requestID,
	}
	authEndpoint, err := authRequest.GetURL()
	if err != nil {
		errorResponse := response.Error{
			Code:      "GET_URL_FAILED",
			Message:   err.Error(),
			RequestID: requestID,
		}
		log.Warnf("failed to retrieve authorization url for github login: %s", errorResponse.String())
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(errorResponse.Bytes())
		return
	}
	log.Debugf("handled request %s", requestID)
	w.Header().Add("Content-Type", "text/html; charset=utf-8")
	w.Header().Add("Location", authEndpoint)
	w.WriteHeader(http.StatusTemporaryRedirect)
	w.Write([]byte(fmt.Sprintf("<html><head><title>%s</title></head><body><a href=\"%s\">%s</a></body></html>", authEndpoint, authEndpoint, authEndpoint)))
}
