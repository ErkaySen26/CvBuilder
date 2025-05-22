import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import styles from './HeroBanner.module.css';
export const HeroBanner = () => (_jsxs("section", { className: styles.hero, children: [_jsx("div", { className: styles.overlay }), _jsxs("div", { className: `container ${styles.content}`, children: [_jsx("h1", { className: styles.title, children: "Kendi Profesyonel CV'ni Olu\u015Ftur" }), _jsx("p", { className: styles.subtitle, children: "Ad\u0131m ad\u0131m bilgilerini gir, \u015Fablonunu se\u00E7 ve k\u0131sa s\u00FCrede \u015F\u0131k bir CV\u2019ye kavu\u015F." }), _jsx(Link, { to: "/templates", className: styles.ctaButton, children: "\u015Eimdi Ba\u015Fla" })] })] }));
