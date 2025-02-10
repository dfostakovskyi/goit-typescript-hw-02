import React, { useState, ChangeEvent, FormEvent } from "react";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import styles from "./searchBar.module.css";
import { IoIosSearch } from "react-icons/io";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
        </button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
