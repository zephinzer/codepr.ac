import React from 'react';

import {faGithub, faGitlab} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './LoginButton.css';

const DEFAULT_PLATFORM = 'github';
const PLATFORM = {
  "github": {
    bgColor: '#000',
    fgColor: '#fff',
    faIcon: faGithub,
    name: 'Login with Github',
  },
  "gitlab": {
    bgColor: '#fc6d26',
    fgColor: '#fff',
    faIcon: faGitlab,
    name: 'Login with Gitlab',
  },
};

export function LoginButton({
  platform,
}) {
  if(!platform) {
    platform = DEFAULT_PLATFORM;
  }
  if(!PLATFORM[platform]) {
    return (
      <a className='login-button' href=''>
        <label>
          Invalid provider <pre>{platform}</pre>
        </label>
      </a>  
    );
  }
  return (
    <a className='login-button' href>
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