import useRoutes from 'Hooks/useRoutes';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Utilities from 'Utilities';

interface IPrivateRoute {
  children: JSX.Element;
}

export default function PublicRoute({ children }: IPrivateRoute) {
  const ROUTES = useRoutes();

  if (!Utilities.apiTokenStorage.get()) {
    return children;
  }
  return <Navigate to={ROUTES.account()} replace />;
}
