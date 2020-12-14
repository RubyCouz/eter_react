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


  let userRole = false
  
  if ( sessionData['login'] ) {
    if ( rest.role ) {
      userRole = sessionData['roles'][0] === rest.role
    } else {
      userRole = true
    }
  }

  // Crée la route ou redirige vers le home  
  return (
    <Route
      {...rest}
      render = {
        ( { location } ) => 
          userRole ? ( children ) : ( <Redirect to = { { pathname: '/home', state: { from: location } } } /> )
      }
    />
  )

}