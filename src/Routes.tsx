import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsUserLoggedIn } from "redux/user/userSelectors";

// Components
import { CircularProgress } from "@material-ui/core";
const Login = lazy(() => import("components/login/LoginForm"));
const DictionaryList = lazy(() =>
  import("components/dictionaryList/DictionaryList")
);
const DictionaryDetail = lazy(() =>
  import("components/dictionaryDetail/DictionaryDetail")
);

// Selectors

const Routes = () => {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  return (
    <Suspense fallback={<CircularProgress />}>
      <Switch>
        {!isUserLoggedIn && <Route component={Login} />}
        <Route exact path="/" component={DictionaryList} />
        <Route exact path="/dictionary/:id" component={DictionaryDetail} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
