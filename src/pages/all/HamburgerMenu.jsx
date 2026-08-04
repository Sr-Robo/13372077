import React, { useState, useEffect } from 'react';

// Menu sanduíche — emula cpl-navbar-container cpl-navbar-collapse-md da referência.
// Links hardcoded no tema; sem query GraphQL por ora.
// Botão ≡ visível só em mobile (≤767px); nav inline em desktop.
// Plugado em headerMiddleLeft sortOrder 20 (logo é 10).

const NAV_LINKS = [
  { label: 'Produtos', url: '/catalog' },
  { label: 'Sobre', url: '/about' },
];

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  // Fecha ao ampliar pra desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const close = (e) => { if (e.matches) setOpen(false); };
    mq.addEventListener('change', close);
    return () => mq.removeEventListener('change', close);
  }, []);

  return (
    <>
      {/* Botão sanduíche — só mobile (CSS esconde em desktop) */}
      <button
        className="cpk-hamburger-btn"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {/* Nav — sempre visível desktop, colapsável mobile */}
      <nav
        className={`cpk-hamburger-nav${open ? ' cpk-hamburger-nav--open' : ''}`}
        aria-label="Menu principal"
      >
        <ul className="cpk-hamburger-nav-list">
          {NAV_LINKS.map((link) => (
            <li key={link.url} className="cpk-hamburger-nav-item">
              <a href={link.url} className="cpk-hamburger-nav-link">{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export const layout = {
  areaId: 'headerMiddleLeft',
  sortOrder: 20
};
