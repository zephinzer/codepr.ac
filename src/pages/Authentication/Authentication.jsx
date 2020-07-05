import React from 'react';
import './Authentication.css';
import logo from 'assets/images/logo.png';
import LoginButton from 'components/LoginButton';
import {AuthenticationSuccess} from './AuthenticationSuccess';
import {AuthenticationError} from './AuthenticationError';

export function Authentication({location}) {
  const isAuthenticationCallback = !!location.search;
  let accessToken,
    isAuthenticationSuccess,
    platform,
    searchParams;
  if (isAuthenticationCallback) {
    searchParams = new URLSearchParams(location.search);
    isAuthenticationSuccess = searchParams.has('access_token');
    accessToken = searchParams.get('access_token');
    platform = searchParams.get('platform');
  }
  return (
    <div className='page-authentication'>
      <br />
      <img
        alt='Codeprac logo'
        className='logo'
        src={logo}
      />
      <br />
      {
        isAuthenticationCallback ?
          (
            isAuthenticationSuccess ?
              <AuthenticationSuccess
                accessToken={accessToken}
                platform={platform}
              />
              : <AuthenticationError />
          )
          : <LoginButtons />
      }
    </div>
  )
}

function LoginButtons() {
  const apiURL = new URL(process.env.REACT_APP_API_URL_BASE || 'http://localhost:30000');
  apiURL.pathname = '/session/github';
  return (
    <div className='login-buttons'>
      <LoginButton href={apiURL.toString()} />
      <LoginButton platform='gitlab' />
    </div>
  )
}
