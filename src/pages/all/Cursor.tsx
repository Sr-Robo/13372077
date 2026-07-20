import React, { useEffect, useRef } from 'react';

// Cursor "mira" (crosshair): ponto + linhas horizontal/vertical que seguem
// o mouse. Posição é escrita direto via style.setProperty em vez de state
// do React, pra não re-renderizar a cada mousemove. Desativado em telas
// touch (sem mouse real) — ver media query (hover: none) em effects.scss.
const HOVER_SELECTOR = 'a, button, input, textarea, select, [role="button"], .cpk-cursor-hover';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const lineHRef = useRef<HTMLDivElement>(null);
  const lineVRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
      return undefined;
    }

    document.documentElement.classList.add('cpk-cursor-active');

    const setPosition = (x: number, y: number) => {
      const xPx = `${x}px`;
      const yPx = `${y}px`;
      [dotRef.current, lineHRef.current, lineVRef.current].forEach((el) => {
        if (el) {
          el.style.setProperty('--cpk-cursor-x', xPx);
          el.style.setProperty('--cpk-cursor-y', yPx);
        }
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      setPosition(event.clientX, event.clientY);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target?.closest?.(HOVER_SELECTOR)) {
        dotRef.current?.classList.add('is-hover');
      }
    };

    const handleOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target?.closest?.(HOVER_SELECTOR)) {
        dotRef.current?.classList.remove('is-hover');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });

    return () => {
      document.documentElement.classList.remove('cpk-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <>
      <div ref={lineHRef} className="cpk-cursor-line cpk-cursor-line--h" aria-hidden="true" />
      <div ref={lineVRef} className="cpk-cursor-line cpk-cursor-line--v" aria-hidden="true" />
      <div ref={dotRef} className="cpk-cursor" aria-hidden="true" />
    </>
  );
}

export const layout = {
  areaId: 'body',
  sortOrder: 900
};
