import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  queryFetchRequest,
  addAnswerFetchRequest,
} from "../../../redux/action/dashboardActions";
import { Loader } from "../../Common/Loader";
import style from "./index.module.scss";
import { Table, Button, Modal, Input } from "antd";

export const Dashboard = (props) => {
  useEffect(() => {
    props.queryFetchRequest(props.user.id);
    // eslint-disable-next-line
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [addAnswer, setAddAnswer] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [selRecord, setSelRecord] = useState(undefined);

  const { Column } = Table;
  const { TextArea } = Input;

  const handleAddQueryModal = (type, record) => {
    console.log("record test,", record);
    setSelRecord(record);
    setModalTitle("Edit Answer");
    setAddAnswer(record.answer);
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const onChangeAddQuery = (event) => {
    setAddAnswer(event.target.value);
  };

  const handleAddQuery = () => {
    console.log("call add api", props.user.id, selRecord?._id, addAnswer);
    props.addAnswerFetchRequest(props.user.id, selRecord?._id, addAnswer);
    setModalOpen(false);
  };

  return (
    <div>
      <div className={style.queryHeader}>
        <h1>Welcome, {props.isAuth && props.user.name}</h1>
      </div>

      <div className={style.queryList}>
        <Loader isLoading={props.isLoading}>
          <Table dataSource={props.queries} rowKey="_id">
            <Column title="ID" dataIndex="_id" key="id" />
            <Column title="Questions" dataIndex="query" key="query" />
            <Column title="Answers" dataIndex="answer" key="answer" />
            <Column
              title="Action"
              key="action"
              render={(_, record) => (
                <>
                  <Button
                    type="text"
                    icon="edit"
                    className="text-primary mr-5"
                    onClick={() => handleAddQueryModal("edit", record)}
                  />
                </>
              )}
            />
          </Table>
        </Loader>
      </div>
      <Modal
        visible={modalOpen}
        title={modalTitle}
        onOk={handleAddQuery}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddQuery}>
            Save
          </Button>,
        ]}
      >
        <TextArea
          value={addAnswer}
          onChange={onChangeAddQuery}
          placeholder="Enter answer..."
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Modal>
    </div>
  );
};

Dashboard.propTypes = {
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

export const DashboardContainer = withRouter(
  connect(mapStateToProps, {
    queryFetchRequest,
    addAnswerFetchRequest,
  })(Dashboard)
);
