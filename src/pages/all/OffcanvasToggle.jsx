import React, { useState } from 'react';

// Três pontos verticais (cpl-offcanvas-toggle da referência shop.html).
// Abre painel lateral com informações de contato.
// SVG: 3×20px, 3 retângulos de 3×3px (topo/meio/base) — idêntico ao original.
// Plugado em headerMiddleLeft, sortOrder 20 (logo é 10).

export default function OffcanvasToggle({ setting }) {
  const [open, setOpen] = useState(false);
  const storeName = setting?.storeName || 'Sr. Robô';

  return (
    <>
      {/* Botão três pontos verticais */}
      <button
        className="cpk-offcanvas-toggle"
        aria-label="Informações e contato"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <svg width="3" height="20" viewBox="0 0 3 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 3.5V0.5H3V3.5H0Z" fill="currentColor" />
          <path d="M0 11.5V8.5H3V11.5H0Z" fill="currentColor" />
          <path d="M0 19.5V16.5H3V19.5H0Z" fill="currentColor" />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="cpk-offcanvas-overlay"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Painel lateral */}
      <div className={`cpk-offcanvas-panel${open ? ' cpk-offcanvas-panel--open' : ''}`} role="dialog" aria-label="Contato" aria-modal="true">
        <div className="cpk-offcanvas-head">
          <a href="/" className="cpk-offcanvas-logo" aria-label={`${storeName} – home`}>
            <img src="/img/cyber-robo.svg" alt={storeName} style={{ height: '32px' }} />
          </a>
          <button
            className="cpk-offcanvas-close"
            aria-label="Fechar"
            onClick={() => setOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16 4L4 16M4 4L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="cpk-offcanvas-body">
          <p className="cpk-offcanvas-tagline">
            Tecnologia com atitude.<br />Feito pra quem leva a sério.
          </p>

          <div className="cpk-offcanvas-section">
            <h3 className="cpk-offcanvas-section-title">Horário</h3>
            <p>Seg – Sex: 9h às 18h</p>
          </div>

          <div className="cpk-offcanvas-section">
            <h3 className="cpk-offcanvas-section-title">Contato</h3>
            <p>
              <a href="mailto:contato@robo.net.br" className="cpk-offcanvas-link">
                contato@robo.net.br
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export const layout = {
  areaId: 'headerMiddleLeft',
  sortOrder: 5
};

export const query = `
  query query {
    setting {
      storeName
    }
  }
`;
