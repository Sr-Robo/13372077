import React from 'react';
import CpkLogo from '../../components/Logo.js';

export default function Logo({ setting }) {
  const storeName = setting?.storeName || 'Sr. Robô';

  return (
    <div className="logo flex justify-start items-center">
      <a href="/" className="logo-icon" aria-label={`${storeName} – home`}>
        {/* Renderiza o Logo customizado cyberpunk (com transição cyber-robo e cyber-rob0 no hover) */}
        <CpkLogo alt={storeName} />
      </a>
    </div>
  );
}

export const layout = {
  areaId: 'headerMiddleLeft',
  sortOrder: 10
};

export const query = `
  query query {
    setting {
      storeName
    }
  }
`;
