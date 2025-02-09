import React from "react";
import PropTypes from "prop-types";
import styles from "./imageCard.module.css";

const ImageCard = ({
  image,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isFlipped,
}) => {
  return (
    <div
      className={`${styles["image-card"]} ${isFlipped ? styles.flipped : ""}`}
      tabIndex="0"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles["image-card-inner"]}>
        <div className={styles["image-card-front"]}>
          <img
            src={image.urls.small}
            alt={image.alt_description || "Image"}
            onClick={() => onClick(image)}
          />
        </div>
        <div className={styles["image-card-back"]}>
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
    promoted_at: PropTypes.string,
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
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  isFlipped: PropTypes.bool.isRequired,
};

export default ImageCard;
