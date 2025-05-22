import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import styles from './EducationForm.module.css';
import { FiTrash2, FiBook } from 'react-icons/fi';
const EducationForm = ({ token }) => {
    const [form, setForm] = useState({
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
        description: ''
    });
    const [educations, setEducations] = useState([]);
    const [message, setMessage] = useState('');
    // Türkçe kısa tarih formatı (örn. "5 Haz 2020")
    const formatDateTr = (dateString) => {
        if (!dateString)
            return '';
        const d = new Date(dateString);
        return d.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };
    const fetchEducations = async () => {
        try {
            const res = await axios.get('/educations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEducations(res.data);
        }
        catch (err) {
            console.error('Eğitim listesi alınamadı:', err);
        }
    };
    useEffect(() => {
        fetchEducations();
    }, [token]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/educations', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Eğitim başarıyla eklendi!');
            setForm({
                school: '',
                degree: '',
                startDate: '',
                endDate: '',
                description: ''
            });
            fetchEducations();
            setTimeout(() => setMessage(''), 3000);
        }
        catch (err) {
            console.error(err);
            setMessage('Hata oluştu.');
            setTimeout(() => setMessage(''), 3000);
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/educations/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchEducations();
        }
        catch (err) {
            console.error('Silme hatası:', err);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("form", { onSubmit: handleSubmit, className: styles.formContainer, children: [_jsx("h3", { className: styles.formTitle, children: "Yeni E\u011Fitim Ekle" }), _jsx("input", { name: "school", placeholder: "Okul", value: form.school, onChange: handleChange, className: styles.input, required: true }), _jsx("input", { name: "degree", placeholder: "B\u00F6l\u00FCm / Derece", value: form.degree, onChange: handleChange, className: styles.input, required: true }), _jsx("input", { name: "startDate", type: "date", value: form.startDate, onChange: handleChange, className: styles.input, required: true }), _jsx("input", { name: "endDate", type: "date", value: form.endDate, onChange: handleChange, className: styles.input }), _jsx("textarea", { name: "description", placeholder: "A\u00E7\u0131klama", value: form.description, onChange: handleChange, className: styles.textarea }), _jsx("button", { type: "submit", className: styles.submitButton, children: "Kaydet" }), message && _jsx("p", { className: styles.feedback, children: message })] }), _jsx("div", { className: styles.list, children: educations.map(edu => (_jsxs("div", { className: styles.card, children: [_jsxs("div", { className: styles.cardHeader, children: [_jsx(FiBook, { className: styles.icon }), _jsxs("div", { children: [_jsx("h4", { className: styles.school, children: edu.school }), _jsx("span", { className: styles.degree, children: edu.degree })] })] }), _jsxs("div", { className: styles.cardBody, children: [_jsxs("span", { className: styles.dates, children: [formatDateTr(edu.startDate), " \u2013 ", formatDateTr(edu.endDate)] }), edu.description && (_jsx("p", { className: styles.description, children: edu.description }))] }), _jsx("button", { onClick: () => handleDelete(edu.id), className: styles.deleteBtn, title: "Sil", children: _jsx(FiTrash2, {}) })] }, edu.id))) })] }));
};
export default EducationForm;
