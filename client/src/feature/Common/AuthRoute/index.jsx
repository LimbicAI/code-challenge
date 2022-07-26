import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AuthAdminRouteContainer = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.isAuth && rest.role === "admin") {
          return <Component {...props} />;
        } else if (!rest.isAuth) {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

const AuthRouteContainer = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.isAuth && rest.role === "user") {
          return <Component {...props} />;
        } else if (!rest.isAuth) {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

AuthAdminRouteContainer.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  role: PropTypes.string,
};

AuthRouteContainer.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  role: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.signin.isAuth,
  role: state.auth.signin.user.role,
});

export const AuthRoute = connect(mapStateToProps)(AuthRouteContainer);
export const AuthAdminRoute = connect(mapStateToProps)(AuthAdminRouteContainer);
