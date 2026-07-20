import React from 'react';

// Ruído de fundo animado (grão tipo estática de TV). Ver .cpk-noise em
// effects.scss para a técnica (textura pequena + animação em steps()).
export default function Noise() {
  return <div className="cpk-noise" aria-hidden="true" />;
}

export const layout = {
  areaId: 'body',
  sortOrder: 899
};
