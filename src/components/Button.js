import React from "react";
import PropTypes from "prop-types";

const Button = ({ buttonText, onClickHandler, styleClass }) => {
  return (
    <button className={styleClass} onClick={onClickHandler}>
      {buttonText}
    </button>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  styleClass: PropTypes.string.isRequired
};

export default Button;
