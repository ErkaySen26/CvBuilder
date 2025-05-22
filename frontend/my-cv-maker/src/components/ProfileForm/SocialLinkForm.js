import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/ProfileForm/SocialLinksForm.tsx
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import styles from './SocialLinkForm.module.css';
import { FiTrash2, FiLink } from 'react-icons/fi';
const SocialLinksForm = ({ token }) => {
    const [form, setForm] = useState({ platform: '', url: '' });
    const [links, setLinks] = useState([]);
    const [error, setError] = useState('');
    const fetchLinks = async () => {
        try {
            const res = await axios.get('/social-links', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLinks(res.data);
        }
        catch (err) {
            console.error('Sosyal linkler alınamadı:', err);
        }
    };
    useEffect(() => {
        fetchLinks();
    }, [token]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('/social-links', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLinks(prev => [...prev, res.data]);
            setForm({ platform: '', url: '' });
        }
        catch {
            setError('Ekleme başarısız. Lütfen tekrar deneyin.');
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/social-links/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLinks(prev => prev.filter(l => l.id !== id));
        }
        catch {
            setError('Silme işlemi başarısız.');
        }
    };
    return (_jsxs("div", { className: styles.wrapper, children: [_jsx("h3", { className: styles.title, children: "Yeni Sosyal Link Ekle" }), error && _jsx("p", { className: styles.error, children: error }), _jsxs("form", { onSubmit: handleSubmit, className: styles.form, children: [_jsx("input", { name: "platform", value: form.platform, onChange: handleChange, placeholder: "Platform (\u00F6rn. LinkedIn)", required: true }), _jsx("input", { name: "url", value: form.url, onChange: handleChange, placeholder: "https://...", type: "url", required: true }), _jsx("button", { type: "submit", children: "Ekle" })] }), _jsx("div", { className: styles.list, children: links.map(link => (_jsxs("div", { className: styles.card, children: [_jsxs("div", { className: styles.cardHeader, children: [_jsx(FiLink, { className: styles.icon }), _jsxs("div", { children: [_jsx("h4", { className: styles.platform, children: link.platform }), _jsx("a", { href: link.url, className: styles.url, target: "_blank", rel: "noopener noreferrer", children: link.url })] })] }), _jsx("button", { onClick: () => handleDelete(link.id), className: styles.deleteBtn, title: "Sil", children: _jsx(FiTrash2, {}) })] }, link.id))) })] }));
};
export default SocialLinksForm;
