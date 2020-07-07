import {connect} from 'react-redux';
import Button from 'components/Button';
import { useEffect, useState } from 'react';
import { mapStateToProps, mapDispatchToProps } from 'GlobalStateProvider';
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({
  dispatch,
  state,
}) => {
  console.info('CurrentSession', state);
  return (
    <div className='current-session'>
      <h2>
        Current Session
      </h2>
      <hr />
      {
        state.authentication.initialised ?
        (
          state.authentication.success ?
          (
            [<div
              className='profile-info'
              key='profile-info'
            >
              <div
                className='picture'
                style={{
                  backgroundImage: `url(${state.authentication.imageUrl}`,
                }}
              />
              <div className='info'>
                <span>@{state.authentication.username}</span>
                <span>{state.authentication.name}</span>
                <span>
                  <a href={state.authentication.imageUrl} target='_blank'>
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
});
