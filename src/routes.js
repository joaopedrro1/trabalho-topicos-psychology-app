import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from  './pages/Home/index.js';
import SignIn from './pages/SignIn/index.js';
import SignUp from './pages/SignUp/index.js';
import Psicologo from './pages/Psicologo/index.js';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={SignIn} />
                <Route path="/cadastro" component={SignUp} />
                <Route path="/painel" component={Psicologo} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;