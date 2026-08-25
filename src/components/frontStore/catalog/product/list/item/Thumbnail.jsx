import PropTypes from 'prop-types';
import React from 'react';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail';

// Fase de layout: listagem ainda não linka pra ficha de produto (sem
// backend wireado). Os 3 destinos que apontariam pra `url` viram <span>
// com a classe `cpk-link-disabled` (pointer-events: none em effects.scss)
// em vez de <a href>, mantendo o mesmo visual sem navegação morta.
function Thumbnail({ imageUrl, alt, isSpecial }) {
  return (
    <div className="product-thumbnail-wrap">
      {/* Termo de campanha da loja (BR) — literal, sem translate. */}
      {isSpecial && <span className="cpk-badge-sale">Promoção!</span>}
      {imageUrl ? (
        <span className="product-link cpk-link-disabled">
          <img src={imageUrl} alt={alt} loading="lazy" />
        </span>
      ) : (
        <span className="product-link cpk-link-disabled">
          <ProductNoThumbnail width={370} height={370} />
        </span>
      )}
      <span
        className="button add-to-cart-button cpk-btn cpk-glitch cpk-link-disabled"
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
      </span>
    </div>
  );
}

Thumbnail.propTypes = {
  alt: PropTypes.string,
  imageUrl: PropTypes.string
};

Thumbnail.defaultProps = {
  alt: '',
  imageUrl: ''
};

export { Thumbnail };
