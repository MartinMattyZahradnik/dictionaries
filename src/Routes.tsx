import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsUserLoggedIn } from "redux/user/userSelectors";

// Components
const Login = lazy(() => import("components/login/LoginForm"));

// Selectors

const Routes = () => {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  return isUserLoggedIn ? (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/login" component={Login} />

        <Redirect to="/" />
      </Switch>
    </Suspense>
  ) : (
    <Redirect to="/" />
  );
};

export default Routes;
