import React from "react"
import { Route, Redirect } from 'react-router-dom';
import { AccountContext } from "../Context/AccountContext"

export default function PrivateRoute({ children, ...rest }) {

  const { JWT } = React.useContext( AccountContext );

  return (
    <Route
      {...rest}
      render={({ location }) =>
        JWT ? (
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