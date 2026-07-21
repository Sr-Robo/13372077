import React from 'react';
import Logo from '../../components/Logo.js';

export default function EveryWhere() {
  return (
    <div className="cpk-card cpk-crop cpk-crop-tl cpk-crop-br container mx-auto px-4 py-8 mt-10">
      <div className="flex justify-center mb-6">
        <Logo />
      </div>
      <h1
        className="cpk-glitch text-center mb-6"
        data-text="Everywhere"
      >
        Everywhere
      </h1>
      <p className="text-center" style={{ color: 'var(--cpk-color-contrast-muted)' }}>
        Este componente é renderizado em toda página da loja.
      </p>
      <p className="text-center" style={{ color: 'var(--cpk-color-contrast-muted)' }}>
        Edite em <code>`themes/13372077/src/pages/all/EveryWhere.tsx`</code>
      </p>
      <div className="flex justify-center mt-6">
        <button type="button" className="cpk-btn cpk-glitch cpk-glitch-btn" data-text="Sr. Robô">
          <span className="cpk-btn-bg" aria-hidden="true" />
          Sr. Robô
        </button>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 20
};
