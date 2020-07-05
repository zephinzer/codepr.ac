import React, {useState, useEffect} from 'react';

const initialState = {
  imageUrl: '',
  name: '',
  username: '',
  errorMessage: '',
  initialised: false,
  success: false,
}

async function getGithubUser(accessToken, platform, setData) {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `token ${accessToken}`,
      'Origin': 'https://api.codepr.ac',
    }
  });
  const data = await response.json();
  if(response.status !== 200) {
    return setData({
      errorMessage: data.message,
      initialised: true,
      success: false,
    })
  }
  localStorage.setItem('login_time', new Date())
  localStorage.setItem('login_token', accessToken)
  localStorage.setItem('login_platform', platform)
  setData({
    imageUrl: data['avatar_url'],
    name: data.name,
    username: data.login,
    initialised: true,
    success: true,
  });
}

export function AuthenticationSuccess({
  accessToken,
  platform,
}) {
  const [data, setData] = useState(initialState);
  useEffect(() => {
    switch(platform) {
      case 'github':
        getGithubUser(accessToken, platform, setData);
        break;
    }
  }, [accessToken, platform]);
  
  return (
    <div className='authentication-success'>
      {
        data.initialised ?
        (
          data.success ?
          (
            <div className='load-success'>
              <h1>
                Welcome
              </h1>
              <img className='profile-image' src={data.imageUrl} />
              <br />
              <span className='username'>
                {data.username}
              </span>
              <span className='name'>
                {data.name}
              </span>
            </div>
          )
          :
          (
            <div className='load-error'>
              Failed to retrieve your details: {data.errorMessage}
            </div>
          )
        )
        :
        (
          <div className='loading'>
            Loading...
          </div>
        )
      }
    </div>
  );
}