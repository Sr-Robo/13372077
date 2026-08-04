import React, { useState } from 'react';
// Três pontos verticais (cpl-offcanvas-toggle da referência shop.html).
// Abre painel lateral com informações de contato.
// SVG: 3×20px, 3 retângulos de 3×3px (topo/meio/base) — idêntico ao original.
// Plugado em headerMiddleLeft, sortOrder 20 (logo é 10).
export default function OffcanvasToggle({ setting }) {
    const [open, setOpen] = useState(false);
    const storeName = (setting === null || setting === void 0 ? void 0 : setting.storeName) || 'Sr. Robô';
    return (React.createElement(React.Fragment, null,
        React.createElement("button", { className: "cpk-offcanvas-toggle", "aria-label": "Informa\u00E7\u00F5es e contato", "aria-expanded": open, onClick: () => setOpen(true) },
            React.createElement("svg", { width: "3", height: "20", viewBox: "0 0 3 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("path", { d: "M0 3.5V0.5H3V3.5H0Z", fill: "currentColor" }),
                React.createElement("path", { d: "M0 11.5V8.5H3V11.5H0Z", fill: "currentColor" }),
                React.createElement("path", { d: "M0 19.5V16.5H3V19.5H0Z", fill: "currentColor" }))),
        open && (React.createElement("div", { className: "cpk-offcanvas-overlay", onClick: () => setOpen(false), "aria-hidden": "true" })),
        React.createElement("div", { className: `cpk-offcanvas-panel${open ? ' cpk-offcanvas-panel--open' : ''}`, role: "dialog", "aria-label": "Contato", "aria-modal": "true" },
            React.createElement("div", { className: "cpk-offcanvas-head" },
                React.createElement("a", { href: "/", className: "cpk-offcanvas-logo", "aria-label": `${storeName} – home` },
                    React.createElement("img", { src: "/img/cyber-robo.svg", alt: storeName, style: { height: '32px' } })),
                React.createElement("button", { className: "cpk-offcanvas-close", "aria-label": "Fechar", onClick: () => setOpen(false) },
                    React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none" },
                        React.createElement("path", { d: "M16 4L4 16M4 4L16 16", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })))),
            React.createElement("div", { className: "cpk-offcanvas-body" },
                React.createElement("p", { className: "cpk-offcanvas-tagline" },
                    "Tecnologia com atitude.",
                    React.createElement("br", null),
                    "Feito pra quem leva a s\u00E9rio."),
                React.createElement("div", { className: "cpk-offcanvas-section" },
                    React.createElement("h3", { className: "cpk-offcanvas-section-title" }, "Hor\u00E1rio"),
                    React.createElement("p", null, "Seg \u2013 Sex: 9h \u00E0s 18h")),
                React.createElement("div", { className: "cpk-offcanvas-section" },
                    React.createElement("h3", { className: "cpk-offcanvas-section-title" }, "Contato"),
                    React.createElement("p", null,
                        React.createElement("a", { href: "mailto:contato@robo.net.br", className: "cpk-offcanvas-link" }, "contato@robo.net.br")))))));
}
export const layout = {
    areaId: 'headerMiddleLeft',
    sortOrder: 20
};
export const query = `
  query query {
    setting {
      storeName
    }
  }
`;
//# sourceMappingURL=OffcanvasToggle.js.map