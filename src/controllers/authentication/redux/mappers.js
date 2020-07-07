import {login, logout, saveToLocalStorage, loadFromLocalStorage} from './actions';

export const mapStateToProps = state => ({state});
export const mapDispatchToProps = dispatch => ({
  dispatch: {
    login: ({accessToken, platform}) => dispatch(login({accessToken, platform})),
    logout: () => dispatch(logout()),
    loadFromLocalStorage: () => dispatch(loadFromLocalStorage()),
    saveToLocalStorage: ({accessToken, platform}) => dispatch(saveToLocalStorage({accessToken, platform})),
  },
});
