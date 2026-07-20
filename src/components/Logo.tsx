import React from 'react';

// Logo com troca no hover: cyber-robo (padrão) vira cyber-rob0 ("0" no
// lugar do "o" — trocadilho rob0t) — puro CSS, ver .cpk-logo em
// effects.scss.
type LogoProps = {
  alt?: string;
  className?: string;
};

export default function Logo({ alt = 'Sr. Robô', className = '' }: LogoProps) {
  return (
    <span className={`cpk-logo ${className}`.trim()}>
      <img src="/img/cyber-robo.svg" alt={alt} />
      <img src="/img/cyber-rob0.svg" alt="" className="cpk-logo-alt" aria-hidden="true" />
    </span>
  );
}
