import React from 'react';
import './Authentication.css';
import logo from 'assets/images/logo.png';
import LoginButton from 'components/LoginButton';

export function Authentication() {
  return (
    <div className='page-authentication'>
      <br />
      <img
        alt='Codeprac logo'
        src={logo}
        style={{height: '100px'}}
      />
      <br />
      <div className='login-buttons'>
        <LoginButton 
          clientId='28462949675b4357b5a6'
          platform='github'
          redirectUri='http://localhost:30000/session/github/callback'
        />
        <LoginButton platform='gitlab' />
      </div>
    </div>
  )
}
