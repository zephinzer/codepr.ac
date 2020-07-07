import {getSelf} from 'controllers/github/self';
import {getAccessToken, getPlatform, isAuthenticated, setPersistentLogin, unsetPersistentLogin} from '../';

export const LOGIN = 'LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const login = ({accessToken, platform}) => async (dispatch) => {
  const action = {type: LOGIN, payload: {accessToken, platform}};
  dispatch(action);
  unsetPersistentLogin();
  switch(platform) {
    case 'github':
      const user = await getSelf({accessToken});
      if (user.isError) {
        action.type = LOGIN_ERROR;
        action.payload.error = `${user.message}: ${user.data.message}`;
        break;
      }
      setPersistentLogin({accessToken, platform});
      action.type = LOGIN_SUCCESS;
      action.payload.data = user.data;
      break;
    default:
      action.type = LOGIN_ERROR;
      action.payload.error = `platform ${platform} is not supported`;
    }
  dispatch(action);
};

export const LOGOUT = 'LOGOUT';
export const logout = () => dispatch => {
  dispatch({type: LOGOUT});
};

export const LOAD_FROM_LOCAL_STORAGE = 'LOAD_FROM_LOCAL_STORAGE';
export const loadFromLocalStorage = () => dispatch => {
  if(isAuthenticated()) {
    dispatch(login({
      accessToken: getAccessToken(),
      platform: getPlatform(),
    }));
  }
};

export const SAVE_TO_LOCAL_STORAGE = 'SAVE_TO_LOCAL_STORAGE';
export const saveToLocalStorage = () => dispatch => {
  dispatch({
    type: SAVE_TO_LOCAL_STORAGE,
  });
};
