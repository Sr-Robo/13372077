import React from 'react';

export default function CyberpunkFooter() {
  return (
    <div className="cpk-footer-copyright grid grid-cols-1 md:grid-cols-2 gap-8 justify-between page-width px-5">
      <div className="self-center">
        <div className="copyright text-center md:text-left text-textSubdued">
          <span>Copyleft <span className="inline-block transform rotate-180">©</span> 2026 Sr. Robô - Todos os direitos revertidos.</span>
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
            <a href="https://t.me/sr_robo_net_br" target="_blank" rel="noopener noreferrer">
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
