import { Modal } from 'antd';

export const ConfirmationModal = ({
  visible,
  title,
  content,
  handleOk,
  handleCancel,
}) => {
  return (
    <Modal
      title={title}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{content}</p>
    </Modal>
  );
};