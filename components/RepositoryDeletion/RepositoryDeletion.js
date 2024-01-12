import { useState } from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { iconStyle } from '../CardRepos/CardRepos.style';

export default function RepositoryDeletion({ onDeleteRepo, repoId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeleteRepo = () => {
    setIsModalVisible(true);
  };

  const handleConfirmDeletion = () => {
    onDeleteRepo(repoId);
    setIsModalVisible(false);
  };

  const onCancelDelete = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={handleDeleteRepo} style={iconStyle}>
        <DeleteOutlined style={{ fontSize: '20px' }} />
      </Button>
      <Modal
        open={isModalVisible}
        title="Delete Repository"
        content="Are you sure you want to delete this repository?"
        onOk={handleConfirmDeletion}
        onCancel={onCancelDelete}
      />
    </>
  );
}

