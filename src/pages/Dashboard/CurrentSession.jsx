import Button from 'components/Button';
import { useEffect, useState } from 'react';
import {getSelf} from 'controllers/github/self';
import {getAccessToken, getPlatform} from 'controllers/authentication';
import { faLink, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const initialState = {
  imageUrl: '',
  profileUrl: '',
  name: '',
  username: '',
  errorMessage: '',
  initialised: false,
  success: false,
  rawData: {},
};

async function getGithubUser(accessToken, setData) {
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
  console.info(user.data);
  setData({
    imageUrl: user.data['avatar_url'],
    profileUrl: user.data['html_url'],
    initialised: true,
    name: user.data.name,
    rawData: user.data,
    success: true,
    username: user.data.login,
  });
}

export default function CurrentSession() {
  const [data, setData] = useState(initialState);
  useEffect(() => {
    const platform = getPlatform();
    const accessToken = getAccessToken();
    switch(platform) {
      case 'github':
        console.info('using accesstoken', accessToken);
        getGithubUser(accessToken, setData);
        break;
      default:
        setData({
          errorMessage: 'no platform was provided',
          initialised: false,
          success: false,
        })
    }
  }, []);

  return (
    <div className='current-session'>

      <h2>
        Current Session
      </h2>
      <hr />
      {
        data.initialised ?
        (
          data.success ?
          (
            [<div
              className='profile-info'
              key='profile-info'
            >
              <div
                className='picture'
                style={{
                  backgroundImage: `url(${data.imageUrl}`,
                }}
              />
              <div className='info'>
                <span>@{data.username}</span>
                <span>{data.name}</span>
                <span>
                  <a href={data.profileUrl} target='_blank'>
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                    View profile
                  </a>
                </span>
              </div>
            </div>,
            <Button
              href='/_/authentication?logout'
              key='logout-button'
            >
              Logout
            </Button>]
          ) : null
        ) : (
          <span>Loading...</span>
        )
      }

    </div>
  )
}