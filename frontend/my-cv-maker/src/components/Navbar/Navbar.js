import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (_jsxs("nav", { className: styles.navbar, children: [_jsx("div", { className: styles.logo, children: _jsx(Link, { to: "/", children: "CvMaker" }) }), _jsx("div", { className: styles.navLinks, children: token ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/templates", className: styles.link, children: "\u015Eablonlar" }), _jsx(Link, { to: "/profile", className: styles.link, children: "Profil" }), _jsx("button", { onClick: handleLogout, className: styles.link, children: "\u00C7\u0131k\u0131\u015F" })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", className: styles.link, children: "Giri\u015F Yap" }), _jsx(Link, { to: "/register", className: styles.link, children: "Kay\u0131t Ol" })] })) })] }));
};
export default Navbar;
