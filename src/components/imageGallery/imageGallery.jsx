import React from "react";
import PropTypes from "prop-types";
import ImageCard from "../imageCard/imageCard";
import styles from "./imageGallery.module.css";

const ImageGallery = ({ images }) => {
  console.log(images);
  return (
    <ul className={styles["image-gallery"]}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} />
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
      }).isRequired,
      alt_description: PropTypes.string,
    })
  ).isRequired,
};

export default ImageGallery;
