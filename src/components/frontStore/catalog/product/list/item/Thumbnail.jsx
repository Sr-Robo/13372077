import PropTypes from 'prop-types';
import React from 'react';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail';

function Thumbnail({ url, imageUrl, alt, isSpecial }) {
  return (
    <div className="product-thumbnail-wrap">
      {isSpecial && <span className="cpk-badge-sale">Sale!</span>}
      {imageUrl ? (
        <a href={url} className="product-link">
          <img src={imageUrl} alt={alt} loading="lazy" />
        </a>
      ) : (
        <a href={url} className="product-link">
          <ProductNoThumbnail width={370} height={370} />
        </a>
      )}
      <a
        href={url}
        className="button add-to-cart-button cpk-btn cpk-glitch"
        data-text="View Product"
      >
        View Product
        <svg
          className="add-to-cart-button__icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 12h13M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}

Thumbnail.propTypes = {
  alt: PropTypes.string,
  imageUrl: PropTypes.string,
  url: PropTypes.string
};

Thumbnail.defaultProps = {
  alt: '',
  imageUrl: '',
  url: ''
};

export { Thumbnail };
