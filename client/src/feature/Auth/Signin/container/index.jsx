import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { SigninForm } from "../components/SigninForm";
import style from "./index.module.scss";
import { connect } from "react-redux";
import { signinRequest } from "../../../../redux/action/signInactions";
import { withRouter } from "react-router-dom";

const Signin = (props) => {
  useEffect(() => {
    if (props.role === "admin") {
      props.isAuth && props.history.push("/home");
    } else if (props.role === "user") {
      props.isAuth && props.history.push("/dashboard");
    }
  });

  return (
    <div className={style.signinFormWrapper}>
      <SigninForm
        onSubmit={props.signinRequest}
        isLoading={props.isLoading}
        isError={props.isError}
        errorMessage={props.errorMessage}
      />
    </div>
  );
};

Signin.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  signinRequest: PropTypes.func.isRequired,
  role: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.signin.isLoading,
  role: state.auth.signin.user.role,
  isAuth: state.auth.signin.isAuth,
  isError: state.auth.signin.isError,
  errorMessage: state.auth.signin.errorMessage,
});

export const SigninContainer = withRouter(
  connect(mapStateToProps, { signinRequest })(Signin)
);
