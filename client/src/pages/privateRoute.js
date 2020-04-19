import React, { useContext } from 'react';
import { Redirect, Route } from "react-router-dom";
import { CartContext } from '../context/cart';

export function PrivateRouteAdmin({ children, ...rest }) {
  const { userInfo } = useContext(CartContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userInfo.role === 1 ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
export function PrivateRouteAuthen({ children, ...rest }) {
  const { userInfo } = useContext(CartContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !userInfo.isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}