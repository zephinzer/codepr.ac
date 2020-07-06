import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "pages/Home";
import Authentication from "pages/Authentication";
import Dashboard from "pages/Dashboard";
import Debug from "pages/Debug";
import {isAuthenticated} from 'controllers/authentication';
import { faGitlab } from "@fortawesome/free-brands-svg-icons";
import {
  faLockOpen,
  faInfo,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

function App() {
  const isUserLoggedIn = isAuthenticated();
  return (
    <div className="app">
      <Router>
        <div className="content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/_/authentication" component={Authentication} />
            <Route path="/_/dashboard" component={Dashboard} />
            <Route path="/_/debug" component={Debug} />
          </Switch>
        </div>
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
              !isUserLoggedIn ? (
                <Link
                  aria-label='login to codeprac'
                  to="/_/authentication"
                >
                  <FontAwesomeIcon size="lg" icon={faLockOpen} />
                </Link>
              ) : null
            }
            {
              isUserLoggedIn ? (
                <Link
                  aria-label='access your dashboard'
                  to="/_/dashboard"
                >
                  <FontAwesomeIcon size="lg" icon={faTachometerAlt} />
                </Link>
              ) : null
            }
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
