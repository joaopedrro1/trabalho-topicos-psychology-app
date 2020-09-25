import React from 'react';
import {
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import DefaultLayout from '../pages/_layouts/default';

import { useAuth } from '../hooks/AuthContext';

const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { psychologist } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!psychologist ? (
          isPrivate ? (
            <DefaultLayout>
              <Component {...rest} />
            </DefaultLayout>
          ) : (
            <Component {...rest} />
          )
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/login-psicologo' : '/psicologo',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
