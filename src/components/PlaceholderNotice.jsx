import PropTypes from 'prop-types';
import React from 'react';

// Filler genérico pra qualquer área do layout que dependeria de
// funcionalidade real ainda não implementada (fase atual = só layout).
// Usar em vez de inventar texto solto por página; registrar o motivo em
// `memory.md § Pendências de funcionalidade`.
export default function PlaceholderNotice({ label }) {
  return (
    <div className="cpk-card cpk-placeholder">
      <span className="cpk-badge">{label}</span>
    </div>
  );
}

PlaceholderNotice.propTypes = {
  label: PropTypes.string
};

PlaceholderNotice.defaultProps = {
  label: 'Em breve'
};
