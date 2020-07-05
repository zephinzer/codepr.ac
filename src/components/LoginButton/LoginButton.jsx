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
  href,
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
  const backgroundColor = PLATFORM[platform].bgColor;
  const foregroundColor = PLATFORM[platform].fgColor;
  const icon = PLATFORM[platform].faIcon;
  const platformName = PLATFORM[platform].name;
  const targetUrl = href ? href : `${PLATFORM[platform].authUrl}?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  return (
    <a
      aria-label={`click to login via ${platformName}`}
      className='login-button'
      href={targetUrl}
    >
      <div className='login-button-content'
        style={{
          backgroundColor,
          color: foregroundColor,
        }}>
        <FontAwesomeIcon
          className='icon'
          icon={icon}
          size='lg'
        />
        <label>{platformName}</label>
      </div>
    </a>
  );
}