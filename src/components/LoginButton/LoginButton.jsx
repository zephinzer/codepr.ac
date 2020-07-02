import React from 'react';

import {faGithub, faGitlab} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './LoginButton.css';

const DEFAULT_PLATFORM = 'github';
const PLATFORM = {
  "github": {
    authUrl: 'https://github.com/login/oauth/authorize/',
    bgColor: '#000',
    fgColor: '#fff',
    faIcon: faGithub,
    name: 'Login with Github',
  },
  "gitlab": {
    authUrl: 'https://gitlab.com/oauth/authorize',
    bgColor: '#fc6d26',
    fgColor: '#fff',
    faIcon: faGitlab,
    name: 'Login with Gitlab',
  },
};

export const LoginButton = ({
  clientId,
  platform,
  redirectUri,
  scopes,
}) => {
  if(!platform) {
    platform = DEFAULT_PLATFORM;
  }
  if(!PLATFORM[platform]) {
    return (
      <span
        aria-label={`an invalid provider, ${platform}, was provided`}
        className='login-button'
      >
        <label>
          Invalid provider <pre>{platform}</pre>
        </label>
      </span>  
    );
  }
  return (
    <a
      aria-label={`click to login via ${PLATFORM[platform].name}`}
      className='login-button'
      href={`${PLATFORM[platform].authUrl}?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`}
    >
      <div className='login-button-content'
        style={{
          backgroundColor: PLATFORM[platform].bgColor,
          color: PLATFORM[platform].fgColor,
        }}>
        <FontAwesomeIcon
          className='icon'
          icon={PLATFORM[platform].faIcon}
          size='lg'
        />
        <label>
          {PLATFORM[platform].name}
        </label>
      </div>
    </a>
  );
}