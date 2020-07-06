import {DataMessage} from 'interfaces/message';

const KEY_ACCESS_TOKEN = 'auth_access_token';
const KEY_LAST_MODIFIED = 'auth_last_modified';
const KEY_LOCK = 'auth_lock';
const KEY_PLATFORM = 'auth_platform';

export {
  KEY_ACCESS_TOKEN,
  KEY_LAST_MODIFIED,
  KEY_LOCK,
  KEY_PLATFORM,
  getAccessToken,
  getLastModified,
  getPlatform,
  isAuthenticated,
  isLocalStorageAvailable,
  setPersistentLogin,
  unsetPersistentLogin,
};

function getAccessToken() {
  return localStorage.getItem(KEY_ACCESS_TOKEN);
}

function getLastModified() {
  return localStorage.getItem(KEY_LAST_MODIFIED);
}

function getPlatform() {
  return localStorage.getItem(KEY_PLATFORM);
}

function isAuthenticated() {
  if (!isLocalStorageAvailable()) {
    return new DataMessage({
      message: 'localStorage is not available',
      isError: true,
    });
  }
  if(localStorage.getItem(KEY_ACCESS_TOKEN)) {
    return true;
  }
  return false;
}

function isLocalStorageAvailable() {
  try {
    localStorage.setItem(KEY_LOCK, '1');
  } catch (ex) {
    console.error(ex);
    return false;
  }
  return true
}

function setPersistentLogin({accessToken, platform}) {
  if (!isLocalStorageAvailable()) {
    return new DataMessage({
      message: 'localStorage is not available',
      isError: true,
    });
  }
  const now = new Date();
  localStorage.setItem(KEY_LOCK, '1');
  localStorage.setItem(KEY_ACCESS_TOKEN, accessToken);
  localStorage.setItem(KEY_PLATFORM, platform);
  localStorage.setItem(KEY_LAST_MODIFIED, now.toISOString());
  localStorage.removeItem(KEY_LOCK);
  return new DataMessage({isError: false});
}

function unsetPersistentLogin() {
  if (!isLocalStorageAvailable()) {
    return new DataMessage({
      message: 'localStorage is not available',
      isError: true,
    });
  }
  localStorage.setItem(KEY_LOCK, '1');
  localStorage.removeItem(KEY_ACCESS_TOKEN);
  localStorage.removeItem(KEY_PLATFORM);
  localStorage.removeItem(KEY_LAST_MODIFIED);
  localStorage.removeItem(KEY_LOCK);
  return new DataMessage({isError: false});
}