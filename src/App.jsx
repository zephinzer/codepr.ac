import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Home from "pages/Home";
import Authentication from "pages/Authentication";
import Dashboard from "pages/Dashboard";
import Debug from "pages/Debug";
import Project from "pages/Project";
import Repositories from "pages/Repositories";
import { isAuthenticated } from "controllers/authentication";
import NavigationBar from "modules/NavigationBar";
import "./App.css";
import { useEffect } from "react";
import { mapStateToProps, mapDispatchToProps } from "GlobalStateProvider";

function App({ dispatch, state }) {
  useEffect(() => {
    dispatch.loadFromLocalStorage();
  }, []);
  return (
    <div className="app">
      <Router>
        <div className="content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/_/authentication" component={Authentication} />
            <Route path="/_/dashboard" component={Dashboard} />
            <Route path="/_/debug" component={Debug} />
            <Route
              path="/_/project/:platform/:owner/:repo+"
              component={Project}
            />
            <Route
              path="/_/repositories/:pageNumber?"
              component={Repositories}
            />
          </Switch>
        </div>
        <NavigationBar />
      </Router>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
