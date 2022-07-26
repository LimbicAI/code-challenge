import React from "react";
import { Layout } from "antd";
import { Header } from "./Header";
import { Footer } from "./Footer";
import PropTypes from "prop-types";
import style from "./index.module.scss";

const { Content } = Layout;

const DashboardComponent = ({ children, user, logout }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header user={user} logout={logout} />
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className={style.dashboardContent}
          style={{
            background: "#fff",
            padding: 24,
            margin: "24px 0 0",
            minHeight: 300,
          }}
        >
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

DashboardComponent.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export const Dashboard = DashboardComponent;
