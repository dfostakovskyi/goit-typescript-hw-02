import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageModal from "../imageModal/ImageModal";
import styles from "./imageCard.module.css";

const ImageCard = ({ image }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles["image-card"]}>
      <div className={styles["image-card-inner"]}>
        <div className={styles["image-card-front"]} onClick={openModal}>
          <img src={image.urls.small} alt={image.alt_description || "Image"} />
        </div>
        <div className={styles["image-card-back"]} onClick={openModal}>
          <p>
            <strong>Created at:</strong>{" "}
            {new Date(image.created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Dimensions:</strong> {image.width} x {image.height}
          </p>
          <p>
            <strong>Description:</strong> {image.description}
          </p>
          <p>
            <strong>Likes:</strong> {image.likes}
          </p>
          <p>
            <strong>User:</strong> {image.user.name}
          </p>
          <p>
            <strong>Twitter:</strong> {image.user.twitter_username}
          </p>
          <p>
            <strong>Portfolio:</strong>{" "}
            <a
              href={image.user.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {image.user.portfolio_url}
            </a>
          </p>
          <p>
            <strong>Location:</strong> {image.user.location}
          </p>
        </div>
      </div>
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        image={{ url: image.urls.regular, alt: image.alt_description }}
      />
    </div>
  );
};

ImageCard.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    promoted_at: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    description: PropTypes.string,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      twitter_username: PropTypes.string,
      portfolio_url: PropTypes.string,
      location: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ImageCard;
