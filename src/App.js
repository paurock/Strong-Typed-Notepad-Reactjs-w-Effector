import React from "react";
import "./stylesheets/App.scss";
import * as Components from "./components/Menus";
import { Route, Switch } from "react-router-dom";
import { routes } from "./data";

const App = () => (
  <>
    <Switch>
      {routes.map(it => (
        <Route
          exact
          key={it.path}
          path={it.path}
          render={Components[it.name]}
        />
      ))}
    </Switch>
  </>
);
export default App;
