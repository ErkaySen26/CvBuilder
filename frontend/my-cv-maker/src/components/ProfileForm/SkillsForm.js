import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/ProfileForm/SkillsForm.tsx
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import styles from './SkillsForm.module.css';
import { FiTrash2, FiCode } from 'react-icons/fi';
const SkillsForm = ({ token }) => {
    const [form, setForm] = useState({ name: '', level: 'Beginner' });
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState('');
    // Yetenekleri çek
    const fetchSkills = async () => {
        try {
            const res = await axios.get('/skills', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSkills(res.data);
        }
        catch (err) {
            console.error('Yetenekler alınamadı:', err);
        }
    };
    useEffect(() => {
        fetchSkills();
    }, [token]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('/skills', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSkills(prev => [...prev, res.data]);
            setForm({ name: '', level: 'Beginner' });
        }
        catch {
            setError('Ekleme başarısız. Lütfen tekrar deneyin.');
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/skills/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSkills(prev => prev.filter(s => s.id !== id));
        }
        catch {
            setError('Silme işlemi başarısız.');
        }
    };
    return (_jsxs("div", { className: styles.wrapper, children: [_jsx("h3", { className: styles.title, children: "Yeni Yetenek Ekle" }), error && _jsx("p", { className: styles.error, children: error }), _jsxs("form", { onSubmit: handleSubmit, className: styles.form, children: [_jsx("input", { name: "name", value: form.name, onChange: handleChange, placeholder: "Yetenek Ad\u0131", required: true }), _jsxs("select", { name: "level", value: form.level, onChange: handleChange, children: [_jsx("option", { value: "Beginner", children: "Ba\u015Flang\u0131\u00E7" }), _jsx("option", { value: "Intermediate", children: "Orta Seviye" }), _jsx("option", { value: "Advanced", children: "Uzmanl\u0131k" })] }), _jsx("button", { type: "submit", children: "Ekle" })] }), _jsx("div", { className: styles.list, children: skills.map(skill => (_jsxs("div", { className: styles.card, children: [_jsxs("div", { className: styles.cardHeader, children: [_jsx(FiCode, { className: styles.icon }), _jsxs("div", { children: [_jsx("h4", { className: styles.name, children: skill.name }), _jsx("span", { className: styles.level, children: skill.level })] })] }), _jsx("button", { onClick: () => handleDelete(skill.id), className: styles.deleteBtn, title: "Sil", children: _jsx(FiTrash2, {}) })] }, skill.id))) })] }));
};
export default SkillsForm;
