import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import ImageCard from "../imageCard/imageCard";
import styles from "./imageGallery.module.css";

interface ImageGalleryProps {
  images: any[];
  openModal: (image: any) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
  const [flippedImage, setFlippedImage] = useState(null);
  const focusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (image: any) => {
    focusTimeoutRef.current = setTimeout(() => {
      setFlippedImage(image);
    }, 3000);
  };

  const handleMouseLeave = () => {
    if (focusTimeoutRef.current !== null) {
      clearTimeout(focusTimeoutRef.current);
      focusTimeoutRef.current = null;
    }
    setFlippedImage(null);
  };

  return (
    <ul className={styles["image-gallery"]}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard
            imageData={image}
            onClick={openModal}
            onMouseEnter={() => handleMouseEnter(image)}
            onMouseLeave={handleMouseLeave}
            isFlipped={flippedImage === image}
          />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
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
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
