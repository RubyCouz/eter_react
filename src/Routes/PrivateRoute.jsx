import React from "react";

import {
  Route,
  Redirect,
} from 'react-router-dom';

import { useCookies } from 'react-cookie';
import { getData } from '../Tools/Cookie/ManagingCookie'


export default function PrivateRoute({ children, ...rest }) {

  const keyCookie = 'jwt_hp'
  const [cookies] = useCookies([keyCookie]);
  const userAdmin = getData(cookies)["roles"] ? 
    getData(cookies)["roles"][0] === 'ROLE_ADMIN'?
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
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )

}