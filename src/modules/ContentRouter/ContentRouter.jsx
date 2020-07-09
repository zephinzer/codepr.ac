import { Switch, Route } from "react-router-dom";

import Home from "pages/Home";
import Authentication from "pages/Authentication";
import Commits from "pages/Commits";
import Dashboard from "pages/Dashboard";
import Debug from "pages/Debug";
import Project from "pages/Project";
import Repositories from "pages/Repositories";
import Workbench from "pages/Workbench";

export default function ContentRouter() {
  return (
    <div className="component-content-router">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/_/authentication" component={Authentication} />
        <Route path="/_/commits/:platform/:owner/:repo+" component={Commits} />
        <Route path="/_/dashboard" component={Dashboard} />
        <Route path="/_/debug" component={Debug} />
        <Route path="/_/project/:platform/:owner/:repo+" component={Project} />
        <Route path="/_/repositories/:pageNumber?" component={Repositories} />
        <Route
          path="/_/workbench/:platform/:owner/:repo?"
          component={Workbench}
        />
      </Switch>
    </div>
  );
}
