import "./ModalComponent.scss";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalComponent({ modalIsOpen, setModalIsOpen }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="My dialog"
      className="mymodal"
      overlayClassName="myoverlay"
      closeTimeoutMS={500}
    >
      <p>Please sign in first in order to save your favourite tipsters.</p>
    </Modal>
  );
}
