import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Routes } from "./routes";
import PrivateRouter from "./privateRouter";

import {
  NotFound,
  Home,
  Login,
  Repository
} from './../screens';

const RouterApp = (props) => {

  return (
    <Router>
      <Switch>

        {/* Login Route */}
        <Route exact path={Routes.idm}>
          <Repository />
        </Route>
        <Route exact path={'/'}>
          <Redirect to={Routes.idm} />
        </Route>
        {/* Home Route */}
        {/* <PrivateRouter exact path={Routes.home}>
          <Home />
        </PrivateRouter> */}

        {/* For unknow/non-defined path */}
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default RouterApp;
