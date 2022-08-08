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
      <div>
        Please connect your wallet first in order to save favourite tipsters.
      </div>
      <button onClick={() => setModalIsOpen(false)}>Close</button>
    </Modal>
  );
}
