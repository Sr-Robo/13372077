import React from 'react';

export default function LoginHero() {
  return (
    <div className="login-hero flex flex-col items-center justify-center pt-8 pb-4">
      {/* Detalhe cyberpunk: cantoneiras */}
      <div
        className="hero-accent absolute"
        style={{
          width: '40px',
          height: '40px',
          borderTop: '2px solid var(--cpk-color-brand)',
          borderLeft: '2px solid var(--cpk-color-brand)',
          top: '-10px',
          left: '-10px'
        }}
      />

      {/* Glitch sub-header */}
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2 cpk-glitch" data-text="AUTH_PROTOCOL_INIT">
        AUTH_PROTOCOL_INIT
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'customerLoginFormTitleBefore',
  sortOrder: 1
};
