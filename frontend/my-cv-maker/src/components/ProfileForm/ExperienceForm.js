import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import styles from './ExperienceForm.module.css';
import { FiTrash2, FiBriefcase } from 'react-icons/fi';
import { formatDateTr } from '../../utils/date';
const ExperienceForm = ({ token }) => {
    const [form, setForm] = useState({
        company: '',
        jobTitle: '',
        startDate: '',
        endDate: '',
        description: ''
    });
    const [experiences, setExperiences] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        axios.get('/experiences', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setExperiences(res.data));
    }, [token]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('/experiences', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExperiences(prev => [...prev, res.data]);
            setForm({ company: '', jobTitle: '', startDate: '', endDate: '', description: '' });
        }
        catch {
            setError('Ekleme başarısız. Lütfen tekrar deneyin.');
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/experiences/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExperiences(prev => prev.filter(exp => exp.id !== id));
        }
        catch {
            setError('Silme işlemi başarısız.');
        }
    };
    return (_jsxs("div", { className: styles.wrapper, children: [_jsx("h3", { children: "Yeni Deneyim Ekle" }), error && _jsx("p", { className: styles.error, children: error }), _jsxs("form", { onSubmit: handleSubmit, className: styles.form, children: [_jsx("input", { name: "company", value: form.company, onChange: handleChange, placeholder: "\u015Eirket Ad\u0131", required: true }), _jsx("input", { name: "jobTitle", value: form.jobTitle, onChange: handleChange, placeholder: "Pozisyon", required: true }), _jsx("input", { name: "startDate", type: "date", value: form.startDate, onChange: handleChange, required: true }), _jsx("input", { name: "endDate", type: "date", value: form.endDate, onChange: handleChange, required: true }), _jsx("textarea", { name: "description", value: form.description, onChange: handleChange, placeholder: "A\u00E7\u0131klama", rows: 3 }), _jsx("button", { type: "submit", children: "Ekle" })] }), _jsx("div", { className: styles.list, children: experiences.map(exp => (_jsxs("div", { className: styles.card, children: [_jsxs("div", { className: styles.cardHeader, children: [_jsx(FiBriefcase, { className: styles.icon }), _jsxs("div", { children: [_jsx("h4", { className: styles.jobTitle, children: exp.jobTitle }), _jsxs("span", { className: styles.company, children: ["@ ", exp.company] })] })] }), _jsxs("div", { className: styles.cardBody, children: [_jsxs("span", { className: styles.dates, children: [formatDateTr(exp.startDate), " \u2013 ", formatDateTr(exp.endDate)] }), exp.description && (_jsx("p", { className: styles.description, children: exp.description }))] }), _jsx("button", { onClick: () => exp.id && handleDelete(exp.id), className: styles.deleteBtn, title: "Sil", children: _jsx(FiTrash2, {}) })] }, exp.id))) })] }));
};
export default ExperienceForm;
