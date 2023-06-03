import Modal from 'react-modal';


export const MyModal = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <h2>Meu Modal</h2>
      <p>Conteúdo do modal...</p>
      <button onClick={closeModal}>Fechar</button>
    </Modal>
  );
};