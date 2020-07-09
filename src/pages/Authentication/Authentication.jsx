import logo from "assets/images/logo.png";
import LoginButton from "components/LoginButton";
import { AuthenticationSuccess } from "./AuthenticationSuccess";
import { AuthenticationError } from "./AuthenticationError";
import { AuthenticationLogout } from "./AuthenticationLogout";

export default function Authentication({ location }) {
  const isAuthenticationCallback = !!location.search;
  let accessToken,
    isAuthenticationSuccess,
    isLogoutAttempt,
    platform,
    searchParams;
  console.log("why");
  if (isAuthenticationCallback) {
    searchParams = new URLSearchParams(location.search);
    isAuthenticationSuccess = searchParams.has("access_token");
    if (isAuthenticationSuccess) {
      accessToken = searchParams.get("access_token");
      platform = searchParams.get("platform");
    } else if (searchParams.has("logout")) {
      isLogoutAttempt = searchParams.has("logout");
    }
  }
  return (
    <div className="page-authentication">
      <br />
      <img alt="Codeprac logo" className="logo" src={logo} />
      <br />
      {isAuthenticationCallback ? (
        isAuthenticationSuccess ? (
          <AuthenticationSuccess
            accessToken={accessToken}
            platform={platform}
          />
        ) : isLogoutAttempt ? (
          <AuthenticationLogout />
        ) : (
          <AuthenticationError />
        )
      ) : (
        <LoginButtons />
      )}
    </div>
  );
}

function LoginButtons() {
  const apiURL = new URL(
    process.env.REACT_APP_API_URL_BASE || "http://localhost:30000"
  );
  apiURL.pathname = "/session/github";
  return (
    <div className="login-buttons">
      <LoginButton href={apiURL.toString()} />
    </div>
  );
}
