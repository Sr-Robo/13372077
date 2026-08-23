import React from 'react';

// Fase de layout: estrelas DECORATIVAS com valor fixo (const) — o sistema
// real de avaliações ainda não existe no EverShop deste fork. Quando existir,
// este componente recebe a média por prop e o List.jsx passa o dado.
// (Pendência registrada em memory.md § Pendências de funcionalidade.)
const RATING_COUNT = 5;

function Star() {
  return (
    <svg
      className="cpk-star"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function Rating() {
  return (
    <div className="cpk-rating" aria-hidden="true" title="Avaliação">
      {Array.from({ length: RATING_COUNT }, (_, i) => (
        <Star key={i} />
      ))}
    </div>
  );
}

export { Rating };
