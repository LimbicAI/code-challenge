import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { usersFetchRequest } from "../../../../redux/action/userActions";
import { Loader } from "../../../Common/Loader";
import { Table, Button, Modal } from "antd";
import { UserAnswerContainer } from "../../UserAnswer";
import style from "./index.module.scss";

export const Users = (props) => {
  useEffect(() => {
    props.usersFetchRequest();
    // eslint-disable-next-line
  }, []);

  const { Column } = Table;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selRecord, setSelRecord] = useState(undefined);

  const handleOK = () => {
    setModalOpen(false);
  };

  const handleAddQueryModal = (record) => {
    setSelRecord(record);
    setModalTitle(`${record.name}'s Answer`);
    setModalOpen(true);
  };

  return (
    <div>
      <h1>Users</h1>
      <div className={style.usersList}>
        <Loader isLoading={props.isLoading}>
          <Table dataSource={props.users} rowKey="_id">
            <Column title="ID" dataIndex="_id" key="id" />
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column
              title="Action"
              key="action"
              render={(_, record) => (
                <>
                  <Button
                    type="text"
                    icon="file-text"
                    className="text-primary mr-5"
                    onClick={() => handleAddQueryModal(record)}
                  />
                </>
              )}
            />
          </Table>
        </Loader>
      </div>
      <Modal
        className={style.answerModal}
        visible={modalOpen}
        title={modalTitle}
        onOk={handleOK}
        footer={[
          <Button key="back" onClick={handleOK}>
            OK
          </Button>,
        ]}
      >
        <UserAnswerContainer
          selRow={selRecord}
          openState={modalOpen}
        ></UserAnswerContainer>
      </Modal>
    </div>
  );
};

Users.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  users: PropTypes.array,
  usersFetchRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.cabinet.users.isLoading,
  users: state.cabinet.users.data,
});

export const UsersContainer = withRouter(
  connect(mapStateToProps, { usersFetchRequest })(Users)
);
