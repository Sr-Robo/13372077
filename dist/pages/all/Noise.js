import React from 'react';
// Ruído de fundo animado (grão tipo estática de TV). Ver .cpk-noise em
// effects.scss — animação em CSS @keyframes + steps(), igual à técnica da
// referência (não JS): a tentativa com JS (setInterval sorteando posição)
// ficou "trêmula" (jitter de layer inteira, sem a cadência real do
// steps()) — a receita original é mais fiel e mais simples.
export default function Noise() {
    return React.createElement("div", { className: "cpk-noise", "aria-hidden": "true" });
}
export const layout = {
    areaId: 'body',
    sortOrder: 899
};
//# sourceMappingURL=Noise.js.map