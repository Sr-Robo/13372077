import React, { useEffect, useRef } from 'react';
// Cursor "mira" (crosshair): ponto + linhas horizontal/vertical que seguem
// o mouse. Posição é escrita direto via style.setProperty em vez de state
// do React, pra não re-renderizar a cada mousemove. Desativado em telas
// touch (sem mouse real) — ver media query (hover: none) em effects.scss.
const HOVER_SELECTOR = 'input, textarea, .cpk-cursor-hover';
export default function Cursor() {
    const dotRef = useRef(null);
    const lineHRef = useRef(null);
    const lineVRef = useRef(null);
    useEffect(() => {
        if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
            return undefined;
        }
        document.documentElement.classList.add('cpk-cursor-active');
        const setPosition = (x, y) => {
            const xPx = `${x}px`;
            const yPx = `${y}px`;
            [dotRef.current, lineHRef.current, lineVRef.current].forEach((el) => {
                if (el) {
                    el.style.setProperty('--cpk-cursor-x', xPx);
                    el.style.setProperty('--cpk-cursor-y', yPx);
                }
            });
        };
        // Um mouse de alta taxa de polling dispara mousemove centenas de vezes
        // por segundo — muito mais que os ~60fps que o navegador realmente
        // pinta. Guarda só a posição mais recente e aplica no próximo frame,
        // em vez de escrever estilo a cada evento bruto.
        let rafId = null;
        let pendingX = 0;
        let pendingY = 0;
        const handleMouseMove = (event) => {
            pendingX = event.clientX;
            pendingY = event.clientY;
            if (rafId === null) {
                rafId = requestAnimationFrame(() => {
                    rafId = null;
                    setPosition(pendingX, pendingY);
                });
            }
        };
        const handleOver = (event) => {
            var _a, _b;
            const target = event.target;
            if ((_a = target === null || target === void 0 ? void 0 : target.closest) === null || _a === void 0 ? void 0 : _a.call(target, HOVER_SELECTOR)) {
                (_b = dotRef.current) === null || _b === void 0 ? void 0 : _b.classList.add('is-hover');
            }
        };
        const handleOut = (event) => {
            var _a, _b;
            const target = event.target;
            if ((_a = target === null || target === void 0 ? void 0 : target.closest) === null || _a === void 0 ? void 0 : _a.call(target, HOVER_SELECTOR)) {
                (_b = dotRef.current) === null || _b === void 0 ? void 0 : _b.classList.remove('is-hover');
            }
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseover', handleOver, { passive: true });
        document.addEventListener('mouseout', handleOut, { passive: true });
        return () => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
            document.documentElement.classList.remove('cpk-cursor-active');
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleOver);
            document.removeEventListener('mouseout', handleOut);
        };
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { ref: lineHRef, className: "cpk-cursor-line cpk-cursor-line--h", "aria-hidden": "true" }),
        React.createElement("div", { ref: lineVRef, className: "cpk-cursor-line cpk-cursor-line--v", "aria-hidden": "true" }),
        React.createElement("div", { ref: dotRef, className: "cpk-cursor", "aria-hidden": "true" })));
}
export const layout = {
    areaId: 'body',
    sortOrder: 900
};
//# sourceMappingURL=Cursor.js.map