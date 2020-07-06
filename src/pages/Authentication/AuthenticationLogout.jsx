import {unsetPersistentLogin} from 'controllers/authentication';

export function AuthenticationLogout() {
  unsetPersistentLogin();
  setTimeout(() => {
    window.location.href = '/';
  }, 3000)
  return (
    <div className="authentication-logout">
      <h1>
        see you
      </h1>
    </div>
  )
}