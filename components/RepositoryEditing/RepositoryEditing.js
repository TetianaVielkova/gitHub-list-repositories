import { useState } from 'react';
import { Button, Modal } from 'antd';
import RepositoryForm from './../RepositoryForm/RepositoryForm';
import { iconStyleEdit } from '../CardRepos/CardRepos.style';
import { EditOutlined } from '@ant-design/icons';

export default function RepositoryEditing({ repository, onUpdateRepo }) {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleEditRepo = () => {
    setIsEditModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsEditModalVisible(false);
  };

  return (
    <>
      <Button onClick={handleEditRepo} style={iconStyleEdit}>
        <EditOutlined style={{ fontSize: '20px' }} />
      </Button>
      {isEditModalVisible && (
        <Modal open={isEditModalVisible} onCancel={handleCloseModal} footer={null}>
        <RepositoryForm
          onSubmit={(updatedData) => {
          onUpdateRepo(repository.id, updatedData);
          }}
          closeModal={handleCloseModal}
          initialData={repository ? repository : null}
          isEditMode={true}
        />
        </Modal>
      )}
    </>
  );
}