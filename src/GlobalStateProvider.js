import { combineReducers, createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import authenticationReducer from 'controllers/authentication/redux/reducer';

import {loadFromLocalStorage, login, logout} from 'controllers/authentication/redux/actions';

export const mapStateToProps = state => ({state});
export const mapDispatchToProps = dispatch => ({
  dispatch: {
    loadFromLocalStorage: () => dispatch(loadFromLocalStorage()),
    login: ({accessToken, platform}) => dispatch(login({accessToken, platform})),
    logout: () => dispatch(logout()),
  },
});
export const reducer = combineReducers({
  authentication: authenticationReducer,
});
export const store = createStore(reducer, {}, applyMiddleware(thunk));

export default ({children}) => (
  <Provider store={store}>
    {children}
  </Provider>
)
