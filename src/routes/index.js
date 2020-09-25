import React from "react";
import { Switch } from "react-router-dom";

import Route from './Route';

import Home from "../pages/Home/index.js";
import SignInUser from "../pages/SignInUser/index.js";
import SignUpUser from "../pages/SignUpUser/index.js";
import SignInPsy from "../pages/SignInPsy/index.js";
import SignUpPsy from "../pages/SignUpPsy/index.js";
import Psicologo from "../pages/Psicologo/index.js";
import Paciente from "../pages/Paciente/index.js";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login-psicologo" exact component={SignInPsy} />
      <Route path="/cadastro-psicologo" exact component={SignUpPsy} />
      <Route path="/psicologo" exact isPrivate component={Psicologo} />
      <Route path="/login" exact component={SignInUser} />
      <Route path="/cadastro" exact component={SignUpUser} />
      <Route path="/paciente" component={Paciente} />
    </Switch>
  );
}

export default Routes;
