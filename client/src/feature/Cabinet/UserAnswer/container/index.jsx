import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  queryFetchRequest,
  addAnswerFetchRequest,
} from "../../../../redux/action/dashboardActions";
import { Loader } from "../../../Common/Loader";
import style from "./index.module.scss";
import { Table } from "antd";

export const UserAnswer = (props) => {
  useEffect(() => {
    if (props.openState) {
      props.queryFetchRequest(props.selRow._id);
    }
    // eslint-disable-next-line
  }, [props.openState]);
  const { Column } = Table;

  return (
    <div>
      <div className={style.queryList}>
        <Loader isLoading={props.isLoading}>
          <Table dataSource={props.queries} rowKey="_id">
            <Column title="ID" dataIndex="_id" key="id" />
            <Column title="Questions" dataIndex="query" key="query" />
            <Column title="Answers" dataIndex="answer" key="answer" />
          </Table>
        </Loader>
      </div>
    </div>
  );
};

UserAnswer.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  isLoading: PropTypes.bool.isRequired,
  queries: PropTypes.array,
  queryFetchRequest: PropTypes.func.isRequired,
  addAnswerFetchRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.signin.isAuth,
  user: state.auth.signin.user,
  isLoading: state.dashboard.isLoading,
  queries: state.dashboard.data,
});

export const UserAnswerContainer = withRouter(
  connect(mapStateToProps, {
    queryFetchRequest,
    addAnswerFetchRequest,
  })(UserAnswer)
);
