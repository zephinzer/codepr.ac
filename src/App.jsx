import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "pages/Home";
import Authentication from "pages/Authentication";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";
import {
  faLockOpen,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/authentication" component={Authentication} />
          </Switch>
        </div>
        <div className="navigation-bar">
          <a
            href="https://gitlab.com/zephinzer/codepr.ac"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon size="lg" icon={faGitlab} />
          </a>
          <Link to="/">
            <FontAwesomeIcon size="lg" icon={faInfo} />
          </Link>
          <Link to="/authentication">
            <FontAwesomeIcon size="lg" icon={faLockOpen} />
          </Link>
        </div>
      </Router>
    </div>
  );
}

export default App;
