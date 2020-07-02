import React from 'react';
import './Authentication.css';
import logo from 'assets/images/logo.png';
import LoginButton from 'components/LoginButton';

export function Authentication() {
  return (
    <div className='page-authentication'>
      <br />
      <img src={logo} style={{height: '100px'}} />
      <br />
      <div className='login-buttons'>
        <LoginButton platform='github' />
        <LoginButton platform='gitlab' />
      </div>
    </div>
  )
}
