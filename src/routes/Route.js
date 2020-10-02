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
  const { psychologist, patient } = useAuth();

  console.log(psychologist);
  console.log(patient);

  function teste(url, urlDefault, location, tipo) {
    return isPrivate === !!tipo ? (
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
          pathname: isPrivate ? url : urlDefault,
          state: { from: location },
        }}
      />
    );
  }


  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return patient
        ? teste('/login', '/paciente', location, patient)
        : teste('/login-psicologo', '/psicologo', location, psychologist)
      }}
    />
  );
};

export default Route;
