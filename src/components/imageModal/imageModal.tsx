import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import styles from "./imageModal.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageData: { url: string; alt?: string | null };
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  imageData,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
      ariaHideApp={false}
    >
      <div className={styles["modal-content"]}>
        <img
          src={imageData.url}
          alt={imageData.alt || "Image"}
          className={styles["modal-image"]}
        />
        <button onClick={onRequestClose} className={styles["close-button"]}>
          Close
        </button>
      </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  imageData: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }).isRequired,
};

export default ImageModal;
