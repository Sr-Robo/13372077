import Area from '@components/common/Area.js';
import React from 'react';

export default function Header() {
  return (
    <header className="header" style={{ backgroundColor: 'var(--cpk-color-bg)' }}>
      <Area
        id="headerTop"
        className="header__top"
        isGlobal
        editableInPageBuilder
      />
      <div className="header__middle page-width flex items-center gap-6 py-4 border-b" style={{ borderColor: 'var(--cpk-color-border)' }}>
        <Area
          id="headerMiddleCenter"
          className="header__middle__center flex shrink-0 items-center"
          isGlobal
          editableInPageBuilder
        />
        <Area
          id="headerMiddleLeft"
          className="header__middle__left flex items-center order-first md:order-none"
          isGlobal
          editableInPageBuilder
        />
        <Area
          id="headerMiddleRight"
          className="header__middle__right ml-auto flex items-center gap-1"
          isGlobal
          editableInPageBuilder
        />
      </div>
      <Area
        id="headerBottom"
        className="header__bottom"
        isGlobal
        editableInPageBuilder
      />
    </header>
  );
}

export const layout = {
  areaId: 'body',
  sortOrder: 1
};
