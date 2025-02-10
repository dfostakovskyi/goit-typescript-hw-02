import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/searchBar/searchBar";
import ImageGallery from "./components/imageGallery/imageGallery";
import Loader from "./components/Loader/loader";
import ErrorMessage from "./components/errorMessage/errorMessage";
import LoadMoreBtn from "./components/loadMoreBtn/loadMoreBtn";
import ImageModal from "./components/imageModal/imageModal";
import "./App.css";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

const App: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const fetchImages = async (query: string, page: number): Promise<void> => {
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
      const newImages: Image[] = response.data.results;
      setImages((prevImages) => [...prevImages, ...newImages]);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (query: string) => {
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

  const openModal = (image: Image) => {
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
          imageData={{
            url: selectedImage.urls.regular,
            alt: selectedImage.alt_description || null,
          }}
        />
      )}
    </div>
  );
};

export default App;
