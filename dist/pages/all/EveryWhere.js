import React from 'react';
import Logo from '../../components/Logo.js';
export default function EveryWhere() {
    return (React.createElement("div", { className: "cpk-card cpk-crop cpk-crop-tl cpk-crop-br container mx-auto px-4 py-8 mt-10" },
        React.createElement("div", { className: "flex justify-center mb-6" },
            React.createElement(Logo, null)),
        React.createElement("h1", { className: "cpk-glitch text-center mb-6", "data-text": "Everywhere" }, "Everywhere"),
        React.createElement("p", { className: "text-center", style: { color: 'var(--cpk-color-contrast-muted)' } }, "Este componente \u00E9 renderizado em toda p\u00E1gina da loja."),
        React.createElement("p", { className: "text-center", style: { color: 'var(--cpk-color-contrast-muted)' } },
            "Edite em ",
            React.createElement("code", null, "`themes/13372077/src/pages/all/EveryWhere.tsx`")),
        React.createElement("div", { className: "flex justify-center mt-6" },
            React.createElement("button", { type: "button", className: "cpk-btn cpk-glitch cpk-glitch-btn", "data-text": "Sr. Rob\u00F4" },
                React.createElement("span", { className: "cpk-btn-bg", "aria-hidden": "true" }),
                "Sr. Rob\u00F4"))));
}
export const layout = {
    areaId: 'content',
    sortOrder: 20
};
//# sourceMappingURL=EveryWhere.js.map