import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import styles from './ProfileForm.module.css';
import { FiSave, FiUpload } from 'react-icons/fi';
const ProfileForm = ({ token, existingProfile, onSuccess }) => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        photoUrl: '',
        summary: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fileSelected, setFileSelected] = useState(false);
    // Load existing profile data if available
    useEffect(() => {
        if (existingProfile) {
            setForm(existingProfile);
        }
    }, [existingProfile]);
    // API endpoint
    const API_URL = '/api';
    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        setIsLoading(true);
        setErrorMessage('');
        setFileSelected(true);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await axios.post('/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            const imageUrl = res.data.url;
            setForm(prev => ({ ...prev, photoUrl: imageUrl }));
            setSuccessMessage("Fotoğraf başarıyla yüklendi!");
            setTimeout(() => setSuccessMessage(''), 3000);
        }
        catch (err) {
            console.error("Fotoğraf yükleme hatası:", err);
            setErrorMessage("Fotoğraf yüklenemedi. Lütfen tekrar deneyin.");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        try {
            await axios.post('/profile', form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccessMessage("Profil bilgileriniz başarıyla kaydedildi!");
            if (onSuccess) {
                setTimeout(() => {
                    onSuccess();
                }, 2000);
            }
            else {
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        }
        catch (err) {
            console.error("Profil kaydetme hatası:", err);
            setErrorMessage("Profil kaydedilemedi. Lütfen daha sonra tekrar deneyin.");
        }
        finally {
            setIsLoading(false);
        }
    };
    const ErrorMessage = () => {
        if (!errorMessage)
            return null;
        return (_jsx("div", { className: styles.errorMessage, children: _jsx("p", { children: errorMessage }) }));
    };
    return (_jsxs("form", { className: styles.formContainer, onSubmit: handleSubmit, children: [_jsx("h2", { className: styles.pageTitle, children: "Profil Bilgileriniz" }), _jsxs("div", { className: styles.formGrid, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "firstName", children: "Ad" }), _jsx("input", { id: "firstName", name: "firstName", value: form.firstName, onChange: handleChange, placeholder: "Ad\u0131n\u0131z", required: true })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "lastName", children: "Soyad" }), _jsx("input", { id: "lastName", name: "lastName", value: form.lastName, onChange: handleChange, placeholder: "Soyad\u0131n\u0131z", required: true })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "birthDate", children: "Do\u011Fum Tarihi" }), _jsx("input", { id: "birthDate", name: "birthDate", type: "date", value: form.birthDate, onChange: handleChange, required: true })] }), _jsx("div", { className: styles.formGroup + ' ' + styles.fullWidth, children: _jsxs("div", { className: styles.fileInputContainer, children: [_jsx("label", { htmlFor: "photo", className: styles.photoLabel, children: "Profil Foto\u011Fraf\u0131" }), _jsxs("label", { className: styles.customFileInput, children: [_jsx(FiUpload, { size: 18 }), fileSelected ? "Fotoğraf Seçildi" : "Fotoğraf Seç", _jsx("input", { id: "photo", type: "file", accept: "image/*", onChange: handleFileChange, className: styles.fileInputHidden })] })] }) }), form.photoUrl && (_jsx("div", { className: styles.photoPreviewContainer + ' ' + styles.fullWidth, children: _jsx("img", { src: form.photoUrl, alt: "Profil", className: styles.photoPreview }) })), _jsxs("div", { className: styles.formGroup + ' ' + styles.fullWidth, children: [_jsx("label", { htmlFor: "summary", children: "Hakk\u0131mda" }), _jsx("textarea", { id: "summary", name: "summary", rows: 5, value: form.summary, onChange: handleChange, placeholder: "Kendinizi k\u0131saca tan\u0131t\u0131n..." })] })] }), _jsx("button", { type: "submit", className: styles.submitButton, disabled: isLoading, children: isLoading ? (_jsx(_Fragment, { children: "\u0130\u015Fleniyor..." })) : (_jsxs(_Fragment, { children: [_jsx(FiSave, { size: 18 }), "Profili Kaydet"] })) }), successMessage && (_jsx("div", { className: styles.successMessage, children: successMessage })), _jsx(ErrorMessage, {})] }));
};
export default ProfileForm;
