import { useState } from "react";
import SearchBar from "./searchBar/searchBar";
import ImageGallery from "./imageGallery/imageGallery";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (query) => {
    setSearch(query);
    console.log(`Searching for: ${query}`);
  };

  return (
    <>
      <div>
        <SearchBar onSubmit={handleSearchSubmit} />
        <ImageGallery />
      </div>
    </>
  );
}

export default App;
