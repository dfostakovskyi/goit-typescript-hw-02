import React from "react";
import { Audio } from "react-loader-spinner";
import styles from "./loader.module.css";

const Loader: React.FC = () => (
  <div className={styles["loader"]}>
    <Audio
      height="80"
      width="80"
      color="green"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);

export default Loader;
