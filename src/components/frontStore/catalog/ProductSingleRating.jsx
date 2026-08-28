import React from 'react';

// E4: Rating decorativo na ficha do produto — mesmas estrelas do card do
// /shop (Rating.jsx de product/list/item), mas com link pra tab de
// avaliações via <label for> (o tab de reviews usa radio hack CSS-only,
// id="cpk-tab-reviews"). Valor fixo: o sistema de avaliações real não
// existe neste fork. (Pendência registrada em memory.md.)
const STAR_COUNT = 5;

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

export default function ProductSingleRating() {
  return (
    <div className="cpk-product-rating">
      <div className="cpk-rating" aria-hidden="true" title="Avaliação">
        {Array.from({ length: STAR_COUNT }, (_, i) => (
          <Star key={i} />
        ))}
      </div>
      <label htmlFor="cpk-tab-reviews" className="cpk-product-rating__count">
        (1 avaliação)
      </label>
    </div>
  );
}

export const layout = {
  areaId: 'productPageMiddleRight',
  sortOrder: 15
};
