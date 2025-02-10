import React from "react";
import PropTypes from "prop-types";
import "./errorMessage.module.css";

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return <div className="error-message">{message}</div>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
