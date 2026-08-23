import PropTypes from 'prop-types';
import React from 'react';

// Fase de layout: sem link pra ficha de produto ainda (ver Thumbnail.jsx).
function Name({ name, id }) {
  return (
    <span className="product-title-link cpk-link-disabled">
      <h2 className="product-title">{name}</h2>
    </span>
  );
}

Name.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export { Name };
