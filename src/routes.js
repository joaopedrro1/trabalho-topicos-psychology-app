import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/index.js";
import SignInUser from "./pages/SignInUser/index.js";
import SignUpUser from "./pages/SignUpUser/index.js";
import SignInPsy from "./pages/SignInPsy/index.js";
import SignUpPsy from "./pages/SignUpPsy/index.js";
import Psicologo from "./pages/Psicologo/index.js";
import Paciente from "./pages/Paciente/index.js";
import Chat from "./pages/Chat/index.js";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login-psicologo" component={SignInPsy} />
        <Route path="/cadastro-psicologo" component={SignUpPsy} />
        <Route path="/psicologo" component={Psicologo} />
        <Route path="/login" component={SignInUser} />
        <Route path="/cadastro" component={SignUpUser} />
        <Route path="/paciente" component={Paciente} />
        <Route path="/chat/:sala" component={Chat} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
