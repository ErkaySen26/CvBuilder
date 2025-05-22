import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { login } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import styles from './AuthGlass.module.css';
const LoginPage = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [showPwd, setShowPwd] = useState(false);
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const res = await login(data);
            const token = res.data; // <-- burada `res.data.token` değil, doğrudan `res.data`
            if (!token) {
                alert('Sunucudan geçerli bir token dönmedi.');
                return;
            }
            console.log("Giriş sonrası token:", token);
            localStorage.setItem('token', token);
            navigate('/');
        }
        catch (err) {
            alert(err.response?.data?.message || 'Giriş başarısız');
        }
    };
    return (_jsx("div", { className: styles.authWrapper, children: _jsxs("div", { className: styles.card, children: [_jsx("h2", { className: styles.title, children: "Giri\u015F Yap" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: styles.formGroup, children: [_jsxs("div", { className: styles.inputWrapper, children: [_jsx(FiMail, { className: styles.inputIcon }), _jsx("input", { type: "email", placeholder: "Email", className: styles.input, ...register('email', { required: 'Email zorunlu' }) })] }), errors.email && _jsx("p", { className: styles.error, children: errors.email.message })] }), _jsxs("div", { className: styles.formGroup, children: [_jsxs("div", { className: styles.inputWrapper, children: [_jsx(FiLock, { className: styles.inputIcon }), _jsx("input", { type: showPwd ? 'text' : 'password', placeholder: "\u015Eifre", className: styles.input, ...register('password', { required: 'Şifre zorunlu' }) }), showPwd
                                            ? _jsx(FiEyeOff, { className: styles.toggleIcon, onClick: () => setShowPwd(false) })
                                            : _jsx(FiEye, { className: styles.toggleIcon, onClick: () => setShowPwd(true) })] }), errors.password && _jsx("p", { className: styles.error, children: errors.password.message })] }), _jsx("button", { type: "submit", className: styles.button, disabled: isSubmitting, children: "Giri\u015F Yap" })] }), _jsxs("p", { className: styles.switchText, children: ["Hesab\u0131n yok mu? ", _jsx(Link, { to: "/register", children: "Kay\u0131t Ol" })] })] }) }));
};
export default LoginPage;
