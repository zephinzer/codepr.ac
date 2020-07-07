import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";
import { mapStateToProps, mapDispatchToProps } from 'GlobalStateProvider';
import { useEffect } from 'react';

export const AuthenticationLogout = connect(
  mapStateToProps,
  mapDispatchToProps
)(({
  dispatch,
  history = useHistory(),
  state,
}) => {
  useEffect(() => {
    dispatch.logout();
    setTimeout(() => history.push('/'), 1500)
  }, []);
  return (
    <div className="authentication-logout">
      <h1>
        see you again
      </h1>
    </div>
  )
});
