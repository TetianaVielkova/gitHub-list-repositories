import React, { useState } from 'react';
import { Button } from 'antd';
import RepositoryModal from '../RepositoryModal/RepositoryModal';

function ButtonAddRepos() {
  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleSubmitForm = (formData) => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" size="large" onClick={handleOpenModal}>
        Add new repository
      </Button>
      <RepositoryModal
        visible={visible}
        onCancel={handleCloseModal}
        onSubmit={handleSubmitForm}
      />
    </>
  );
}

export default ButtonAddRepos;
