import React from 'react';

// Texto exibido enquanto a config "Copyright" (Admin → Configurações → Loja,
// card de campos customizados / metafield `custom.copyright`) estiver vazia.
// Preenchida, a config passa a valer — o layout nunca sobrepõe o valor do admin.
const COPYLEFT_FALLBACK =
  'Copyleft © 2026 Sr. Robô - Todos os direitos revertidos.';

// Preserva o charme do © invertido (🄯) em qualquer texto vindo da config:
// o caractere chega como texto puro do metafield, então envolvemos cada "©"
// num span com a rotação (ver .cpk-copyleft-mark em effects.scss).
function CopyLeftText({ text }: { text: string }) {
  const parts = text.split('©');
  return (
    <span>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="cpk-copyleft-mark">©</span>}
          {part}
        </React.Fragment>
      ))}
    </span>
  );
}

export default function CyberpunkFooter({ themeConfig }) {
  const copyRight = themeConfig?.copyRight || COPYLEFT_FALLBACK;
  return (
    <div className="cpk-footer-copyright grid grid-cols-1 md:grid-cols-2 gap-8 justify-between w-full px-4 lg:px-6">
      <div className="self-center">
        <div className="copyright text-center md:text-left text-textSubdued">
          <span>
            <CopyLeftText text={copyRight} />
          </span>
        </div>
      </div>

      <div className="cpk-social-links cpk-social-links-text flex justify-center md:justify-end self-center">
        <ul>
          <li>
            <a href="https://youtube.com/@sr.robo.net.br0" target="_blank" rel="noopener noreferrer">
              YOUTUBE.
            </a>
          </li>
          <li>
            <a href="https://instagr.am/sr.robo.net.br" target="_blank" rel="noopener noreferrer">
              INSTAGRAM.
            </a>
          </li>
          <li>
            <a href="https://tiktok.com/@sr.robo.net.br" target="_blank" rel="noopener noreferrer">
              TIKTOK.
            </a>
          </li>
          <li>
            <a href="https://t.me/+6s4y5eOZQLIxMjkx" target="_blank" rel="noopener noreferrer">
              TELEGRAM.
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'footerBottom',
  sortOrder: 20
};

export const query = `
  query query {
    themeConfig {
      copyRight
    }
  }
`;
