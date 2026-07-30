import Area from '@components/common/Area.js';
import React from 'react';

export default function Footer({ themeConfig }) {
  // Utilizamos a cópia definida ou nosso override.
  const copyRight = themeConfig?.copyRight || 'Copyleft © 2026 // Sr. Robô. Todos os direitos revertidos.';

  return (
    <footer className="footer mt-20 pt-14 pb-8 cpk-card cpk-crop cpk-crop-tl cpk-crop-br relative z-10 border-t-0 shadow-lg" style={{ 
      backgroundColor: 'var(--cpk-color-bg-100)',
      borderColor: 'var(--cpk-color-border)',
      borderTop: '2px solid var(--cpk-color-brand)' 
    }}>
      <Area
        id="footerTop"
        className="footer__top"
        isGlobal
        editableInPageBuilder
      />
      <div className="footer__middle page-width flex flex-wrap items-start justify-between gap-10">
        <Area
          id="footerMiddleLeft"
          className="footer__middle__left"
          isGlobal
          editableInPageBuilder
        />
        <Area
          id="footerMiddleCenter"
          className="footer__middle__center"
          isGlobal
          editableInPageBuilder
        />
        <Area
          id="footerMiddleRight"
          className="footer__middle__right"
          isGlobal
          editableInPageBuilder
        />
      </div>
      <Area
        id="footerBottom"
        className="footer__bottom mt-12 border-t pt-6"
        style={{ borderColor: 'var(--cpk-color-border)' }}
        isGlobal
        editableInPageBuilder
        coreComponents={[
          {
            component: {
              default: (
                <div className="page-width grid grid-cols-1 md:grid-cols-2 gap-5 justify-between">
                  <div className="flex items-center justify-center md:justify-start">
                    <ul className="flex space-x-4 text-sm font-medium" style={{ color: 'var(--cpk-color-contrast-muted)' }}>
                      <li>
                        <a href="https://github.com/fxlip/evershop" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                          GitHub
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          Status
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="self-center">
                    <div className="copyright text-center text-sm md:text-right" style={{ color: 'var(--cpk-color-contrast-muted)' }}>
                      <span className="cpk-glitch" data-text={copyRight}>{copyRight}</span>
                    </div>
                  </div>
                </div>
              )
            },
            sortOrder: 10
          }
        ]}
      />
    </footer>
  );
}

export const layout = {
  areaId: 'body',
  sortOrder: 10
};

export const query = `
  query query {
    themeConfig {
      copyRight
    }
  }
`;
