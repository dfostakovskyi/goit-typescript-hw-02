import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import ImageCard from "../imageCard/imageCard";
import styles from "./imageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  const [flippedImage, setFlippedImage] = useState(null);
  const focusTimeoutRef = useRef(null);

  const handleMouseEnter = (image) => {
    focusTimeoutRef.current = setTimeout(() => {
      setFlippedImage(image);
    }, 3000);
  };

  const handleMouseLeave = () => {
    clearTimeout(focusTimeoutRef.current);
    setFlippedImage(null);
  };

  return (
    <>
      <ul className={styles["image-gallery"]}>
        {images.map((image) => (
          <li key={image.id}>
            <ImageCard
              image={image}
              onClick={openModal}
              onMouseEnter={() => handleMouseEnter(image)}
              onMouseLeave={handleMouseLeave}
              isFlipped={flippedImage === image}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      urls: PropTypes.shape({
        small: PropTypes.string.isRequired,
      }).isRequired,
      alt_description: PropTypes.string,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
