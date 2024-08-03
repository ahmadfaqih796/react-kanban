import React from "react";
import { Modal } from "antd";

const DeleteModal = ({
  visible,
  onConfirm,
  isLoading,
  onCancel,
  titleData,
}) => {
  return (
    <Modal
      title="Delete Confirmation"
      // visible={visible}
      open={visible}
      onOk={onConfirm}
      loading={isLoading}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
    >
      <p>Are you sure you want to delete this {titleData || "data"} ?</p>
    </Modal>
  );
};

export default DeleteModal;
