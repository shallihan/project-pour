import React from 'react';
import Modal from './Modal';
import Button from './Button';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      show={!!props.error}
      footer={<Button onClick={props.onClear}>OKAY</Button>}
      className="error-modal__container"
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
