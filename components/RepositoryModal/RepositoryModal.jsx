import { Modal } from 'antd';
import RepositoryForm from '../RepositoryForm/RepositoryForm';

function RepositoryModal({ visible, onCancel, onSubmit }) {

    const handleFormSubmit = (data) => {
        onSubmit(data);
        onCancel();
    };
    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <RepositoryForm onSubmit={handleFormSubmit} closeModal={onCancel}/>
        </Modal>
    );
}

export default RepositoryModal;