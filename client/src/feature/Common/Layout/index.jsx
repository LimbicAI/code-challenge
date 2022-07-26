import React from "react";
import PropTypes from "prop-types";
import { Auth } from "./components/Auth";
import { Dashboard } from "./components/Dashboard";
import { Cabinet } from "./components/Cabinet";
import { menuList } from "../../../config/menu";
import { connect } from "react-redux";
import { logoutHandler } from "../../../redux/action/signInactions";

const LayoutContainer = (props) => {
  if (props.isAuth && props.role === "admin") {
    return (
      <Cabinet
        menuList={menuList}
        user={props.user}
        logout={props.logoutHandler}
      >
        {props.children}
      </Cabinet>
    );
  } else if (props.isAuth && props.role === "user") {
    return (
      <Dashboard user={props.user} logout={props.logoutHandler}>
        {props.children}
      </Dashboard>
    );
  } else {
    return <Auth>{props.children}</Auth>;
  }
};

LayoutContainer.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  role: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  logoutHandler: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.signin.isAuth,
  role: state.auth.signin.user.role,
  user: state.auth.signin.user,
});

export const Layout = connect(mapStateToProps, { logoutHandler })(
  LayoutContainer
);
