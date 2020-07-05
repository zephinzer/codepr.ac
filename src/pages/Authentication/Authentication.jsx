import React from 'react';
import './Authentication.css';
import logo from 'assets/images/logo.png';
import LoginButton from 'components/LoginButton';

export function Authentication({location}) {
  console.log(location);
  const apiURL = new URL(process.env.REACT_APP_API_URL_BASE || 'http://localhost:30000');
  apiURL.pathname = '/session/github';
  return (
    <div className='page-authentication'>
      <br />
      <img
        alt='Codeprac logo'
        className='logo'
        src={logo}
      />
      <br />
      <div className='login-buttons'>
        <LoginButton href={apiURL.toString()} />
        <LoginButton platform='gitlab' />
      </div>
    </div>
  )
}
