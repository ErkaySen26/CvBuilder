import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { registerUser } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import styles from './AuthGlass.module.css';
const RegisterPage = () => {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
    const [showPwd, setShowPwd] = useState(false);
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            return alert('Şifreler eşleşmiyor');
        }
        try {
            await registerUser({ email: data.email, password: data.password });
            alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
            navigate('/login'); // ✅ Sadece login sayfasına yönlendiriyoruz
        }
        catch (err) {
            alert(err.response?.data?.message || 'Kayıt başarısız');
        }
    };
    return (_jsx("div", { className: styles.authWrapper, children: _jsxs("div", { className: styles.card, children: [_jsx("h2", { className: styles.title, children: "Kay\u0131t Ol" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: styles.formGroup, children: [_jsxs("div", { className: styles.inputWrapper, children: [_jsx(FiMail, { className: styles.inputIcon }), _jsx("input", { type: "email", placeholder: "Email", className: styles.input, ...register('email', { required: 'Email zorunlu' }) })] }), errors.email && _jsx("p", { className: styles.error, children: errors.email.message })] }), _jsxs("div", { className: styles.formGroup, children: [_jsxs("div", { className: styles.inputWrapper, children: [_jsx(FiLock, { className: styles.inputIcon }), _jsx("input", { type: showPwd ? 'text' : 'password', placeholder: "\u015Eifre", className: styles.input, ...register('password', {
                                                required: 'Şifre zorunlu',
                                                minLength: { value: 6, message: 'En az 6 karakter' }
                                            }) }), showPwd
                                            ? _jsx(FiEyeOff, { className: styles.toggleIcon, onClick: () => setShowPwd(false) })
                                            : _jsx(FiEye, { className: styles.toggleIcon, onClick: () => setShowPwd(true) })] }), errors.password && _jsx("p", { className: styles.error, children: errors.password.message })] }), _jsxs("div", { className: styles.formGroup, children: [_jsxs("div", { className: styles.inputWrapper, children: [_jsx(FiLock, { className: styles.inputIcon }), _jsx("input", { type: showPwd ? 'text' : 'password', placeholder: "\u015Eifre (Tekrar)", className: styles.input, ...register('confirmPassword', { required: 'Tekrar şifre zorunlu' }) })] }), errors.confirmPassword && _jsx("p", { className: styles.error, children: errors.confirmPassword.message })] }), _jsx("button", { type: "submit", className: styles.button, disabled: isSubmitting, children: "Kay\u0131t Ol" })] }), _jsxs("p", { className: styles.switchText, children: ["Zaten hesab\u0131n var m\u0131? ", _jsx(Link, { to: "/login", children: "Giri\u015F Yap" })] })] }) }));
};
export default RegisterPage;
