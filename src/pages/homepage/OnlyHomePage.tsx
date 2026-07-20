import React from 'react';

export default function OnlyHomePage() {
  return (
    <div className="cpk-card cpk-crop cpk-crop-tl cpk-crop-br container mx-auto px-4 py-8 mt-10 cpk-glow-sm">
      <h1
        className="cpk-glitch cpk-display text-center mb-6"
        data-text="Sr. Robô"
      >
        Sr. Robô
      </h1>
      <p className="text-center" style={{ color: 'var(--cpk-color-contrast-muted)' }}>
        A loja ainda está em construção — a versão alfa do layout chegou primeiro.
      </p>
      <p className="text-center" style={{ color: 'var(--cpk-color-contrast-muted)' }}>
        Edite em <code>`themes/13372077/src/pages/homepage/OnlyHomePage.tsx`</code>
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <span className="cpk-badge">alfa</span>
        <button type="button" className="cpk-btn cpk-btn--outline cpk-crop cpk-crop-tl">
          Ver progresso
        </button>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
