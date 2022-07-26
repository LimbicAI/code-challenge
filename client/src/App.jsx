import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { AuthRoute, AuthAdminRoute } from "./feature/Common/AuthRoute";
import { Layout } from "./feature/Common/Layout";
import { history } from "./helpers/history";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { getAuthUserData } from "./helpers/auth";
import { signinSuccess, logout } from "./redux/action/signInactions";

import { initAuthInterceptor } from "./helpers/api";

const userAuth = getAuthUserData();
if (userAuth) {
  store.dispatch(signinSuccess(userAuth));
}

initAuthInterceptor(store, logout);

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout>
          <Switch>
            {adminRoutes.map((item, i) => (
              <AuthAdminRoute
                path={item.path}
                component={item.component}
                key={i}
                exact={item.exact}
              />
            ))}
            {authRoutes.map((item, i) => (
              <Route
                path={item.path}
                component={item.component}
                key={i}
                exact={item.exact}
              />
            ))}
            {userRoutes.map((item, i) => (
              <AuthRoute
                path={item.path}
                component={item.component}
                key={i}
                exact={item.exact}
              />
            ))}
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
