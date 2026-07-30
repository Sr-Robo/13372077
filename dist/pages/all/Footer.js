import Area from '@components/common/Area.js';
import React from 'react';
export default function Footer({ themeConfig }) {
    // Utilizamos a cópia definida ou nosso override.
    const copyRight = (themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig.copyRight) || 'Copyleft © 2026 // Sr. Robô. Todos os direitos revertidos.';
    return (React.createElement("footer", { className: "footer mt-20 pt-14 pb-8 cpk-card cpk-crop cpk-crop-tl cpk-crop-br relative z-10 border-t-0 shadow-lg", style: {
            backgroundColor: 'var(--cpk-color-bg-100)',
            borderColor: 'var(--cpk-color-border)',
            borderTop: '2px solid var(--cpk-color-brand)'
        } },
        React.createElement(Area, { id: "footerTop", className: "footer__top", isGlobal: true, editableInPageBuilder: true }),
        React.createElement("div", { className: "footer__middle page-width flex flex-wrap items-start justify-between gap-10" },
            React.createElement(Area, { id: "footerMiddleLeft", className: "footer__middle__left", isGlobal: true, editableInPageBuilder: true }),
            React.createElement(Area, { id: "footerMiddleCenter", className: "footer__middle__center", isGlobal: true, editableInPageBuilder: true }),
            React.createElement(Area, { id: "footerMiddleRight", className: "footer__middle__right", isGlobal: true, editableInPageBuilder: true })),
        React.createElement(Area, { id: "footerBottom", className: "footer__bottom mt-12 border-t pt-6", style: { borderColor: 'var(--cpk-color-border)' }, isGlobal: true, editableInPageBuilder: true, coreComponents: [
                {
                    component: {
                        default: (React.createElement("div", { className: "page-width grid grid-cols-1 md:grid-cols-2 gap-5 justify-between" },
                            React.createElement("div", { className: "flex items-center justify-center md:justify-start" },
                                React.createElement("ul", { className: "flex space-x-4 text-sm font-medium", style: { color: 'var(--cpk-color-contrast-muted)' } },
                                    React.createElement("li", null,
                                        React.createElement("a", { href: "https://github.com/fxlip/evershop", target: "_blank", rel: "noopener noreferrer", className: "hover:text-white transition-colors" }, "GitHub")),
                                    React.createElement("li", null,
                                        React.createElement("a", { href: "#", className: "hover:text-white transition-colors" }, "Status")))),
                            React.createElement("div", { className: "self-center" },
                                React.createElement("div", { className: "copyright text-center text-sm md:text-right", style: { color: 'var(--cpk-color-contrast-muted)' } },
                                    React.createElement("span", { className: "cpk-glitch", "data-text": copyRight }, copyRight)))))
                    },
                    sortOrder: 10
                }
            ] })));
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
//# sourceMappingURL=Footer.js.map