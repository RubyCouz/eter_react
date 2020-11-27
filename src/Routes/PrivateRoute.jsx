import React, { useContext } from 'react';

import {
  Route,
  Redirect,
} from 'react-router-dom';

import { AccountContext } from '../Context/AccountContext';

export default function PrivateRoute({ children, ...rest }) {

  const { sessionData } = useContext( AccountContext );


  const userAdmin = sessionData['login'] ? 
    sessionData['roles'][0] === 'ROLE_ADMIN'?
      true
      : false
  : false

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )

}