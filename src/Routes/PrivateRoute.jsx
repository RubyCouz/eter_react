import React from "react"
import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie'

export default function PrivateRoute({ children, ...rest }) {

  const [cookies, setCookie] = useCookies(['auth']);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        cookies.auth != undefined ? (
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