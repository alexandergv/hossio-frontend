import React from 'react';
import Modal from 'react-modal';
import { createRoot } from 'react-dom/client';

// Establece el elemento principal de la aplicación
Modal.setAppElement('#root'); // Asegúrate de que el ID coincida con el ID de tu contenedor principal en el HTML

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: "center",
    zIndex: 1001,
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const ModalContainer = ({ isOpen, message, resolve, onClose }) => {
  const handleConfirm = () => {
    resolve(true);
    onClose();
  };

  const handleCancel = () => {
    resolve(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCancel}
      style={customStyles}
      contentLabel="Confirmation Modal"
    >
      <h2>Confirmación</h2>
      <div style={{marginBottom:"35px"}}>{message}</div>
      <button onClick={handleConfirm}>Confirmar</button>
      <button className='btn-danger' onClick={handleCancel}>Cancelar</button>
    </Modal>
  );
};

let modalRoot = null;
let root = null;

export const ShowModal = (message) => {
  return new Promise((resolve) => {
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = 'modal-root';
      document.body.appendChild(modalRoot);
    }

    if (!root) {
      root = createRoot(modalRoot);
    }

    const onClose = () => {
      root.unmount();
      document.body.removeChild(modalRoot);
      modalRoot = null; // Reset modalRoot to allow re-creation
      root = null; // Reset root to allow re-creation
    };

    root.render(
      <ModalContainer isOpen={true} message={message} resolve={resolve} onClose={onClose} />
    );
  });
};
