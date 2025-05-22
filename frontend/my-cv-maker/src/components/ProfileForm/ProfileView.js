import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './ProfileForm.module.css';
import { FiEdit2 } from 'react-icons/fi';
const ProfileView = ({ profile, onEdit }) => {
    // Format date to display in a more readable format
    const formatDate = (dateString) => {
        if (!dateString)
            return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };
    return (_jsxs("div", { className: styles.profileSummaryContainer, children: [_jsx("h2", { className: styles.pageTitle, children: "Profil Bilgileriniz" }), _jsxs("div", { className: styles.profileGrid, children: [_jsx("div", { className: styles.profileImageContainer, children: profile.photoUrl ? (_jsx("img", { src: profile.photoUrl, alt: `${profile.firstName} ${profile.lastName}`, className: styles.profileImage })) : (_jsx("div", { className: styles.profileImage, style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#e5e7eb'
                            }, children: _jsx(FiUser, { size: 64, color: "#9ca3af" }) })) }), _jsxs("div", { className: styles.profileInfo, children: [_jsxs("p", { children: [_jsx("strong", { children: "Ad:" }), " ", profile.firstName || '-'] }), _jsxs("p", { children: [_jsx("strong", { children: "Soyad:" }), " ", profile.lastName || '-'] }), _jsxs("p", { children: [_jsx("strong", { children: "Do\u011Fum Tarihi:" }), " ", formatDate(profile.birthDate) || '-'] }), _jsxs("p", { children: [_jsx("strong", { children: "Hakk\u0131mda:" }), " ", profile.summary || 'Henüz bilgi girilmemiş.'] }), _jsxs("button", { className: styles.editButton, onClick: onEdit, children: [_jsx(FiEdit2, { size: 18 }), "Profili D\u00FCzenle"] })] })] })] }));
};
export default ProfileView;
