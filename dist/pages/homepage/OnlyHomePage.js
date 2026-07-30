import React from 'react';
export default function OnlyHomePage() {
    return (React.createElement("div", { className: "home-hero-section relative z-10 flex flex-col items-center justify-center text-center mt-12 mb-20 py-20 px-4 cpk-card cpk-crop cpk-crop-tr cpk-crop-bl", style: {
            background: 'linear-gradient(45deg, var(--cpk-color-bg-200), var(--cpk-color-bg-100))'
        } },
        React.createElement("div", { className: "hero-content max-w-4xl mx-auto" },
            React.createElement("h1", { className: "cpk-glitch cpk-display mb-8 uppercase tracking-widest", "data-text": "SR. ROB\u00D4 EQUIPAMENTOS", style: { textShadow: 'var(--cpk-glow-md)' } }, "SR. ROB\u00D4 EQUIPAMENTOS"),
            React.createElement("p", { className: "text-xl mb-12 max-w-2xl mx-auto leading-relaxed", style: { color: 'var(--cpk-color-contrast-muted)' } }, "A nova fronteira de hardware e acess\u00F3rios. A loja oficial que alimenta o seu n\u00FAcleo de processamento."),
            React.createElement("div", { className: "flex flex-wrap justify-center gap-6 mt-8" },
                React.createElement("a", { href: "/shop", className: "cpk-btn cpk-glitch cpk-glitch-btn group", "data-text": "Explorar Cat\u00E1logo" },
                    React.createElement("span", { className: "cpk-btn-bg", "aria-hidden": "true" }),
                    "Explorar Cat\u00E1logo"),
                React.createElement("a", { href: "/about", className: "cpk-btn cpk-btn--outline cpk-crop cpk-crop-tl" },
                    React.createElement("span", { className: "cpk-btn-bg", "aria-hidden": "true" }),
                    "Nossa Miss\u00E3o"))),
        React.createElement("div", { className: "absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none", style: {
                background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, var(--cpk-color-brand) 10px, var(--cpk-color-brand) 20px)'
            } }),
        React.createElement("div", { className: "absolute bottom-4 left-4 flex gap-2" },
            React.createElement("span", { className: "w-2 h-2 rounded-full", style: { backgroundColor: 'var(--cpk-color-glitch-2)' } }),
            React.createElement("span", { className: "w-2 h-2 rounded-full", style: { backgroundColor: 'var(--cpk-color-glitch-1)' } }),
            React.createElement("span", { className: "w-2 h-2 rounded-full", style: { backgroundColor: 'var(--cpk-color-brand)' } }))));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
//# sourceMappingURL=OnlyHomePage.js.map