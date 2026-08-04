import React from 'react';
import CpkLogo from '../../components/Logo.js';
export default function Logo({ setting }) {
    const storeName = (setting === null || setting === void 0 ? void 0 : setting.storeName) || 'Sr. Robô';
    return (React.createElement("div", { className: "logo flex justify-start items-center" },
        React.createElement("a", { href: "/", className: "logo-icon", "aria-label": `${storeName} – home` },
            React.createElement(CpkLogo, { alt: storeName }))));
}
export const layout = {
    areaId: 'headerMiddleLeft',
    sortOrder: 10
};
export const query = `
  query query {
    setting {
      storeName
    }
  }
`;
//# sourceMappingURL=Logo.js.map