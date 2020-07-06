import {useState, useEffect} from 'react';
import {getSelf} from 'controllers/github/self';
import {setPersistentLogin, unsetPersistentLogin} from 'controllers/authentication';

const initialState = {
  imageUrl: '',
  name: '',
  username: '',
  errorMessage: '',
  initialised: false,
  success: false,
  rawData: {},
}

async function getGithubUser(accessToken, platform, setData) {
  const user = await getSelf({accessToken});
  if (user.isError) {
    unsetPersistentLogin()
    return setData({
      errorMessage: `${user.message}: ${user.data.message}`,
      initialised: true,
      rawData: user.data,
      success: false,
    });
  }
  setPersistentLogin({accessToken, platform});
  setData({
    imageUrl: user.data['avatar_url'],
    initialised: true,
    name: user.data.name,
    rawData: user.data,
    success: true,
    username: user.data.login,
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
      default:
        setData({
          errorMessage: 'no platform was provided',
          initialised: false,
          success: false,
        })
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
              <img
                alt='your profile pic'
                className='profile-image'
                src={data.imageUrl}
              />
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