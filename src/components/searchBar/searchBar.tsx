import React, { useState } from "react";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import styles from "./searchBar.module.css";
import { IoIosSearch } from "react-icons/io";

function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      toast.error("Please enter a search term!");
    } else {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <header>
      <Toaster />

      <form className={styles["search-form"]} onSubmit={handleSubmit}>
        <input
          className={styles["search-input"]}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />

        <button className={styles["search-button"]} type="submit">
          <IoIosSearch className={styles["search-icon"]} />{" "}
          {/* Додаємо іконку */}
        </button>
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
