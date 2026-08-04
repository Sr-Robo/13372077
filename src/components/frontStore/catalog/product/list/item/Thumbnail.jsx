import PropTypes from 'prop-types';
import React from 'react';
import ProductNoThumbnail from '@components/common/ProductNoThumbnail';

function Thumbnail({ url, imageUrl, alt }) {
  return (
    <div className="product-thumbnail-wrap">
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
        className="button add-to-cart-button cpk-btn cpk-btn--outline cpk-glitch"
        data-text="View Product"
      >
        <span className="cpk-btn-bg" aria-hidden="true" />
        View Product
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
