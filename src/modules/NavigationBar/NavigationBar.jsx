import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { faGitlab } from "@fortawesome/free-brands-svg-icons";
import {
  faInfo,
  faTachometerAlt,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {mapStateToProps, mapDispatchToProps} from 'GlobalStateProvider';

export default connect(mapStateToProps, mapDispatchToProps)(function({state}) {
  return (
    <div className="navigation-bar">
      <div className="navigation-bar-content">
        <a
          href="https://gitlab.com/zephinzer/codepr.ac"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon size="lg" icon={faGitlab} />
        </a>
        <Link
          aria-label='to the homepage'
          to="/"
        >
          <FontAwesomeIcon size="lg" icon={faInfo} />
        </Link>
        {
          !state.authentication.initialised ? (
            !state.authentication.success ? (
              <Link
                aria-label='login to codeprac'
                to="/_/authentication"
              >
                <FontAwesomeIcon size="lg" icon={faLockOpen} />
              </Link>
            ) : null
          ) : null
        }
        {
          state.authentication.initialised ? (
            state.authentication.success ? (
              <Link
                aria-label='access your dashboard'
                to="/_/dashboard"
              >
                <FontAwesomeIcon size="lg" icon={faTachometerAlt} />
              </Link>
            ) : null
          ) : null
        }
      </div>
    </div>
  )
});
