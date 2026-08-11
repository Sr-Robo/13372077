import React from 'react';

export default function CyberpunkFooter() {
  return (
    <div className="cpk-footer-copyright grid grid-cols-1 md:grid-cols-2 gap-8 justify-between">
      <div className="self-center">
        <div className="copyright text-center md:text-left text-textSubdued">
          <span>(C) 2026 Sr. Robô. Todos os direitos revertidos</span>
        </div>
      </div>

      <div className="cpk-social-links cpk-social-links-text flex justify-center md:justify-end self-center">
        <ul>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              YOUTUBE.
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              INSTAGRAM.
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              TIKTOK.
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
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
