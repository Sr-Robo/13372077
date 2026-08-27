import PropTypes from 'prop-types';
import React from 'react';

// Reativado (2026-08-27): nome volta a linkar pra ficha de produto.
function Name({ name, url }) {
  return (
    <a href={url} className="product-title-link">
      <h2 className="product-title">{name}</h2>
    </a>
  );
}

Name.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export { Name };
