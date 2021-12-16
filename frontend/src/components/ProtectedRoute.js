import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ ...props }) {
  return (
    <Route {...props}>
      {() => (props.loggedIn ? props.children : <Redirect to="./signin" />)}
    </Route>
  );
}

export default ProtectedRoute;
