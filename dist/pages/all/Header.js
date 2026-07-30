import Area from '@components/common/Area.js';
import React from 'react';
export default function Header() {
    return (React.createElement("header", { className: "header", style: { backgroundColor: 'var(--cpk-color-bg)' } },
        React.createElement(Area, { id: "headerTop", className: "header__top", isGlobal: true, editableInPageBuilder: true }),
        React.createElement("div", { className: "header__middle page-width flex items-center gap-6 py-4 border-b", style: { borderColor: 'var(--cpk-color-border)' } },
            React.createElement(Area, { id: "headerMiddleCenter", className: "header__middle__center flex shrink-0 items-center", isGlobal: true, editableInPageBuilder: true }),
            React.createElement(Area, { id: "headerMiddleLeft", className: "header__middle__left flex items-center order-first md:order-none", isGlobal: true, editableInPageBuilder: true }),
            React.createElement(Area, { id: "headerMiddleRight", className: "header__middle__right ml-auto flex items-center gap-1", isGlobal: true, editableInPageBuilder: true })),
        React.createElement(Area, { id: "headerBottom", className: "header__bottom", isGlobal: true, editableInPageBuilder: true })));
}
export const layout = {
    areaId: 'body',
    sortOrder: 1
};
//# sourceMappingURL=Header.js.map