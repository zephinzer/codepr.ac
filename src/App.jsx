import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { isAuthenticated } from "controllers/authentication";
import NavigationBar from "modules/NavigationBar";
import ContentRouter from "modules/ContentRouter";
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
        <ContentRouter />
        <NavigationBar />
      </Router>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
