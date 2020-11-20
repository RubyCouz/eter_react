import React from "react";

import {
  Route,
  Redirect,
} from 'react-router-dom';

import { AccountContext } from '../Context/AccountContext';

export default function PrivateRoute({ children, ...rest }) {

  const { login } = React.useContext( AccountContext );

  return (
    <Route
      {...rest}
      render={({ location }) =>
        login ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )

}