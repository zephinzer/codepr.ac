package session

import (
	c "github.com/usvc/go-config"
)

const (
	CodepracRedirectURI         = "https://www.codepr.ac/login"
	LoginURL                    = "login-url"
	GithubAuthURL               = "github-auth-url"
	GithubClientID              = "github-client-id"
	GithubClientSecret          = "github-client-secret"
	GithubGrantURL              = "github-grant-url"
	GithubRedirectURI           = "github-redirect-uri"
	GithubOAuthAuthorizationURL = "https://github.com/login/oauth/authorize"
	GithubOAuthGrantURL         = "https://github.com/login/oauth/access_token"
	GithubOAuthRedirectURI      = "https://api.codepr.ac/session/github/callback"
)

var config = c.Map{
	GithubAuthURL: &c.String{
		Default: GithubOAuthAuthorizationURL,
	},
	GithubClientID:     &c.String{},
	GithubClientSecret: &c.String{},
	GithubGrantURL: &c.String{
		Default: GithubOAuthGrantURL,
	},
	GithubRedirectURI: &c.String{
		Default: GithubOAuthRedirectURI,
	},
	LoginURL: &c.String{
		Default: CodepracRedirectURI,
	},
}
