import React from "react";
import { Switch, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Files } from "./pages/Files";

export const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/files" component={Files} />
    </Switch>
  );
};
