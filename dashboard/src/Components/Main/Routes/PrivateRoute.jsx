/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import utilities from 'Utilities';
import routes from 'Dictionaries/routes';

export default function PrivateRoute({
  render,
  component: Component,
  ...rest
}) {
  const { componentProps } = rest;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (render) return render(props);
        return utilities.apiTokenStorage.get() ? (
          <Component {...props} componentProps={componentProps} />
        ) : (
          <Redirect to={routes.signin()} />
        );
      }}
    />
  );
}
