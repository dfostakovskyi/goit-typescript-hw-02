import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/searchBar/searchBar";
import ImageGallery from "./components/imageGallery/imageGallery";
import Loader from "./components/Loader/loader";
import ErrorMessage from "./components/errorMessage/errorMessage";
import LoadMoreBtn from "./components/loadMoreBtn/loadMoreBtn";
import ImageModal from "./components/imageModal/imageModal";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async (query, page) => {
    const API_KEY = "7P8sjmoH78qLA-B_FEKE24wUCCtTwpeGuMswIh54_Tw";
    const BASE_URL = "https://api.unsplash.com/search/photos";
    const params = {
      query,
      page,
      per_page: 12,
      client_id: API_KEY,
    };

    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, { params });
      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (query) => {
    setSearch(query);
    setImages([]);
    setPage(1);
    fetchImages(query, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(search, nextPage);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {images && images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage message={`Error: ${error}`} />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {!loading && images.length === 0 && !error && <p>No images found.</p>}
      {selectedImage && (
        <ImageModal
          isOpen={true}
          onRequestClose={closeModal}
          image={{
            url: selectedImage.urls.regular,
            alt: selectedImage.alt_description,
          }}
        />
      )}
    </div>
  );
}

export default App;
