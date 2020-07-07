import {useEffect} from 'react';
import {connect} from 'react-redux';
import {getSelf} from 'controllers/github/self';
import {setPersistentLogin, unsetPersistentLogin} from 'controllers/authentication';
import Button from 'components/Button';
import { mapStateToProps, mapDispatchToProps } from 'GlobalStateProvider';

const initialState = {
  imageUrl: '',
  name: '',
  username: '',
  errorMessage: '',
  initialised: false,
  success: false,
  rawData: {},
}

export const AuthenticationSuccess = connect(
  mapStateToProps,
  mapDispatchToProps
)(({
  accessToken,
  dispatch,
  platform,
  state,
}) => {
  useEffect(() => {
    dispatch.login({accessToken, platform});
  }, [accessToken, platform]);
  
  return (
    <div className='authentication-success'>
      {
        state.authentication.initialised ?
        (
          state.authentication.success ?
          (
            <div className='load-success'>
              <h1>
                Welcome
              </h1>
              <img
                alt='your profile pic'
                className='profile-image'
                src={state.authentication.imageUrl}
              />
              <br />
              <span className='username'>
                {state.authentication.username}
              </span>
              <span className='name'>
                {state.authentication.name}
              </span>
              <br />
              <Button
                href='/_/dashboard'
              >
                Go to your dashboard
              </Button>
            </div>
          )
          :
          (
            <div className='load-error'>
              Failed to retrieve your details: {state.authentication.errorMessage}
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
});