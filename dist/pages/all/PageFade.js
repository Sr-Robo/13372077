import React, { useEffect, useRef } from 'react';
// Fade entre navegações de página. O EverShop não tem router SPA — cada
// clique em link interno recarrega a página inteira — então o efeito é:
// fade-out (cobrir a tela) antes de deixar o navegador seguir o link, e
// fade-in (revelar) assim que a página nova monta.
const FADE_DURATION_MS = 250;
function isInternalNavigationClick(event, anchor) {
    if (event.defaultPrevented)
        return false;
    if (event.button !== 0)
        return false;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return false;
    if (anchor.target && anchor.target !== '_self')
        return false;
    if (anchor.hasAttribute('download'))
        return false;
    if (anchor.href.startsWith('mailto:') || anchor.href.startsWith('tel:'))
        return false;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin)
        return false;
    if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return false;
    }
    return true;
}
export default function PageFade() {
    const overlayRef = useRef(null);
    useEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay)
            return undefined;
        const revealFrame = requestAnimationFrame(() => {
            overlay.classList.add('is-hidden');
        });
        const handleClick = (event) => {
            var _a, _b;
            const anchor = (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.closest) === null || _b === void 0 ? void 0 : _b.call(_a, 'a');
            if (!anchor || !isInternalNavigationClick(event, anchor))
                return;
            event.preventDefault();
            overlay.classList.remove('is-hidden');
            overlay.classList.add('is-leaving');
            window.setTimeout(() => {
                window.location.href = anchor.href;
            }, FADE_DURATION_MS);
        };
        document.addEventListener('click', handleClick);
        return () => {
            cancelAnimationFrame(revealFrame);
            document.removeEventListener('click', handleClick);
        };
    }, []);
    return React.createElement("div", { ref: overlayRef, className: "cpk-fade", "aria-hidden": "true" });
}
export const layout = {
    areaId: 'body',
    sortOrder: 901
};
//# sourceMappingURL=PageFade.js.map