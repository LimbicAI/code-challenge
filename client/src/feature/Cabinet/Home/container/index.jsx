import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  queryFetchRequest,
  addQueryFetchRequest,
  delQueryFetchRequest,
} from "../../../../redux/action/homeActions";
import { Loader } from "../../../Common/Loader";
import style from "./index.module.scss";
import { Table, Button, Modal, Input } from "antd";

export const Home = (props) => {
  useEffect(() => {
    props.queryFetchRequest();
    // eslint-disable-next-line
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [addQuery, setAddQuery] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [selRecord, setSelRecord] = useState(undefined);

  const { Column } = Table;
  const { TextArea } = Input;
  const { confirm } = Modal;

  const handleAddQueryModal = (type, record) => {
    if (type === "add") {
      setAddQuery("");
      setSelRecord(undefined);
      setModalTitle("Add Question");
    } else {
      console.log("record test,", record);
      setSelRecord(record);
      setModalTitle("Edit Question");
      setAddQuery(record.query);
    }
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const onChangeAddQuery = (event) => {
    setAddQuery(event.target.value);
  };

  const handleAddQuery = () => {
    console.log("call add api", selRecord?._id, addQuery);
    props.addQueryFetchRequest(selRecord?._id, addQuery);
    setModalOpen(false);
  };

  function showDeleteConfirm(id) {
    confirm({
      title: "Are you sure delete this question?",
      content: "",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("call delete api", id);
        props.delQueryFetchRequest(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  return (
    <div>
      <div className={style.queryHeader}>
        <h1>Welcome, {props.isAuth && props.user.name}</h1>
        <div className={style.addQueryBtn}>
          <Button
            type="primary"
            onClick={() => handleAddQueryModal("add")}
            icon="plus"
          >
            Add
          </Button>
        </div>
      </div>

      <div className={style.queryList}>
        <Loader isLoading={props.isLoading}>
          <Table dataSource={props.queries} rowKey="_id">
            <Column title="ID" dataIndex="_id" key="id" />
            <Column title="Questions" dataIndex="query" key="query" />
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
                  <Button
                    type="text"
                    icon="delete"
                    className="text-danger"
                    onClick={() => showDeleteConfirm(record._id)}
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
          value={addQuery}
          onChange={onChangeAddQuery}
          placeholder="Enter question..."
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Modal>
    </div>
  );
};

Home.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  isLoading: PropTypes.bool.isRequired,
  queries: PropTypes.array,
  queryFetchRequest: PropTypes.func.isRequired,
  addQueryFetchRequest: PropTypes.func.isRequired,
  delQueryFetchRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.signin.isAuth,
  user: state.auth.signin.user,
  isLoading: state.cabinet.home.isLoading,
  queries: state.cabinet.home.data,
});

export const HomeContainer = withRouter(
  connect(mapStateToProps, {
    queryFetchRequest,
    addQueryFetchRequest,
    delQueryFetchRequest,
  })(Home)
);
