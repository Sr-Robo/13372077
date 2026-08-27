import PropTypes from 'prop-types';
import React from 'react';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail';

// Reativado (2026-08-27): os 3 destinos (imagem, fallback e botão
// "Ver Produto") voltam a linkar pra ficha de produto.
function Thumbnail({ imageUrl, alt, isSpecial, url }) {
  return (
    <div className="product-thumbnail-wrap">
      {/* Termo de campanha da loja (BR) — literal, sem translate. */}
      {isSpecial && <span className="cpk-badge-sale">Promoção!</span>}
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
        data-text="Ver Produto"
      >
        Ver Produto
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
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

Thumbnail.defaultProps = {
  alt: '',
  imageUrl: ''
};

export { Thumbnail };
