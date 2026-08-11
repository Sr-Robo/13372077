import PropTypes from 'prop-types';
import React from 'react';

function Price({ regular, special }) {
  const isSpecial = special && special.value < regular.value;
  return (
    <span className="price">
      {isSpecial ? (
        <>
          <del aria-hidden="true">
            <span className="amount">{regular.text}</span>
          </del>
          <span className="screen-reader-text">
            Original price was: {regular.text}.
          </span>
          <ins aria-hidden="true">
            <span className="amount">{special.text}</span>
          </ins>
          <span className="screen-reader-text">
            Current price is: {special.text}.
          </span>
        </>
      ) : (
        <span className="amount">{regular.text}</span>
      )}
    </span>
  );
}

Price.propTypes = {
  regular: PropTypes.shape({
    value: PropTypes.number,
    text: PropTypes.string
  }).isRequired,
  special: PropTypes.shape({
    value: PropTypes.number,
    text: PropTypes.string
  })
};

Price.defaultProps = {
  special: null
};

export { Price };
