import React from 'react';
export default function Logo({ alt = 'Sr. Robô', className = '' }) {
    return (React.createElement("span", { className: `cpk-logo ${className}`.trim() },
        React.createElement("img", { src: "/img/cyber-robo.svg", alt: alt }),
        React.createElement("img", { src: "/img/cyber-rob0.svg", alt: "", className: "cpk-logo-alt", "aria-hidden": "true" })));
}
//# sourceMappingURL=Logo.js.map