import PropTypes from 'prop-types';
import React from 'react';

function Price({ regular, special }) {
  // O core do Evershop retorna special = regular quando não há preço especial real,
  // ou pode retornar tipos flutuantes inconsistentes. O 'text' é garantido formatado.
  const isSpecial = special && regular && special.text !== regular.text && special.value < regular.value;
  return (
    <span className="price">
      {isSpecial ? (
        <>
          {/* Promoção primeiro, preço anterior riscado depois — mesma ordem
              da referência (pedido do fxlip 2026-08-25). */}
          <ins aria-hidden="true">
            <span className="amount">{special.text}</span>
          </ins>
          <span className="screen-reader-text">
            Current price is: {special.text}.
          </span>
          <del aria-hidden="true">
            <span className="amount">{regular.text}</span>
          </del>
          <span className="screen-reader-text">
            Original price was: {regular.text}.
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
