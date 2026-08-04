import PropTypes from 'prop-types';
import React from 'react';

function Name({ name, url, id }) {
  return (
    <a href={url} className="product-title-link">
      <h2 className="product-title">{name}</h2>
    </a>
  );
}

Name.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export { Name };
