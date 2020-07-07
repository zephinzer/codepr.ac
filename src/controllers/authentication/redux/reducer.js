import {getSelf} from 'controllers/github/self';
import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, LOAD_FROM_LOCAL_STORAGE, SAVE_TO_LOCAL_STORAGE } from './actions';
import {getAccessToken, getPlatform, isAuthenticated, setPersistentLogin, unsetPersistentLogin} from '../';

export const INITIAL_STATE = {
  accessToken: '',
  platform: '',
  name: '',
  username: '',
  imageUrl: '',
  errorMessage: '',
  initialised: false,
  success: null,
  rawData: {},
};
export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SAVE_TO_LOCAL_STORAGE: {
      const {accessToken, platform} = action.payload;
      setPersistentLogin({accessToken, platform});
      return {...state};
    }
    case LOAD_FROM_LOCAL_STORAGE:
      return {...state};
    case LOGIN: {
      const {accessToken, platform} = action.payload;
      return {
        ...INITIAL_STATE,
        accessToken,
        platform,
      };
    }
    case LOGIN_ERROR: {
      const {accessToken, platform} = action.payload;
      return {
        ...INITIAL_STATE,
        accessToken,
        platform,
        errorMessage: action.payload.error,
        initialised: true,
      }
    }
    case LOGIN_SUCCESS: {
      const {accessToken, platform} = action.payload;
      switch(platform) {
        case 'github':
          return {
            ...state,
            accessToken,
            platform,
            name: action.payload.data.name,
            username: action.payload.data.login,
            imageUrl: action.payload.data['avatar_url'],
            rawData: action.payload.data,
            initialised: true,
            success: true,
          };
      }
      return {
        ...INITIAL_STATE,
        accessToken,
        platform,
        errorMessage: `platform '${platform}' is not supported`,
        initialised: true,
      };
    }
    case LOGOUT:
      unsetPersistentLogin();
      return {...INITIAL_STATE};
    default:
      return state;
  }
};
