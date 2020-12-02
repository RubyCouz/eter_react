import React, {
  useContext,
} from 'react';

import {
  Route,
  Redirect,
} from 'react-router-dom';

import {
  AccountContext
} from '../Context/AccountContext';

export default function PrivateRoute({ children, ...rest }) {

  const { sessionData } = useContext( AccountContext );

  const userRole =
    sessionData['login'] ? 
      rest.role ?
        sessionData['roles'][0] === rest.role
      : 
        true
      ?
        true
      : 
        false
    :
      false

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userRole ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/home',
              state: { from: location }
            }}
          />
        )
      }
    />
  )

}