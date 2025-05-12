/* eslint-disable prettier/prettier */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import utilities from 'Utilities';
import routes from 'Dictionaries/routes';

export default function PublicRoute({
  component: Component,
  restricted,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        utilities.apiTokenStorage.get() ? (
          <Redirect to={routes.home()} />
        ) : (
          <Component {...props} />
        )}
    />
  );
}
