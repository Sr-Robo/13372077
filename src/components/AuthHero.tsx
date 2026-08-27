import React from 'react';

// Sub-header glitch acima do título das páginas de autenticação
// (login/criar conta). A cantoneira é absoluta SEM position:relative
// aqui de propósito: ela ancora no ancestor posicionado mais próximo —
// o card .rounded-lg.border.py-8, que ganha position: relative no CSS
// do tema — marcando o canto do CARD, não do sub-header.
export default function AuthHero({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-4">
      {/* Detalhe cyberpunk: cantoneira */}
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
      <div
        className="text-xs uppercase tracking-widest text-muted-foreground mb-2 cpk-glitch w-full"
        data-text={label}
      >
        {label}
      </div>
    </div>
  );
}
