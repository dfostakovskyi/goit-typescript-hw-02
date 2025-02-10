import React from "react";
import PropTypes from "prop-types";
import styles from "./imageCard.module.css";

interface Image {
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string | null;

  created_at: string;
  updated_at: string;
  promoted_at?: string | null;
  width: number;
  height: number;
  description?: string | null;
  likes: number;
  user: {
    name: string;
    twitter_username?: string | null;
    portfolio_url?: string | null;
    location?: string | null;
  };
}

interface ImageCardProps {
  imageData: Image;
  onClick: (image: Image) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isFlipped: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageData,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isFlipped,
}) => {
  return (
    <div
      className={`${styles["image-card"]} ${isFlipped ? styles.flipped : ""}`}
      tabIndex={0}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles["image-card-inner"]}>
        <div className={styles["image-card-front"]}>
          <img
            src={imageData.urls.small}
            alt={imageData.alt_description || "Image"}
            onClick={() => onClick(imageData)}
          />
        </div>
        <div className={styles["image-card-back"]}>
          <p>
            <strong>Created at:</strong>{" "}
            {new Date(imageData.created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Dimensions:</strong> {imageData.width} x {imageData.height}
          </p>
          <p>
            <strong>Description:</strong> {imageData.description}
          </p>
          <p>
            <strong>Likes:</strong> {imageData.likes}
          </p>
          <p>
            <strong>User:</strong> {imageData.user.name}
          </p>
          {imageData.user.twitter_username && (
            <p>
              <strong>Twitter:</strong> {imageData.user.twitter_username}
            </p>
          )}
          {imageData.user.portfolio_url && (
            <p>
              <strong>Portfolio:</strong>{" "}
              <a
                href={imageData.user.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {imageData.user.portfolio_url}
              </a>
            </p>
          )}
          {imageData.user.location && (
            <p>
              <strong>Location:</strong> {imageData.user.location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  imageData: PropTypes.shape({
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
