import React from 'react';
import PropTypes from "prop-types";

const Error = ({mensaje}) => {
    return (
         <legend  className="text-center">{mensaje}</legend>
      );
};

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
  };
 
export default Error;