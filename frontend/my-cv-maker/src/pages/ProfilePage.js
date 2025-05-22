import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import ProfileView from '../components/ProfileForm/ProfileView';
import RightSidebar from '../components/ProfileForm/RightSidebar';
import axios from '../api/axios';
import styles from '../components/ProfileForm/ProfileForm.module.css';
import { FiLogIn } from 'react-icons/fi';
const ProfilePage = () => {
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
        if (storedToken) {
            fetchProfileData(storedToken);
        }
        else {
            setLoading(false);
        }
    }, []);
    const fetchProfileData = async (tokenValue) => {
        try {
            const res = await axios.get('/profile', {
                headers: { Authorization: `Bearer ${tokenValue}` }
            });
            setProfile(res.data);
        }
        catch (err) {
            console.error("Profil verisi alınamadı:", err);
            setProfile(null);
        }
        finally {
            setLoading(false);
        }
    };
    const handleProfileUpdateSuccess = () => {
        if (token) {
            fetchProfileData(token);
            setEditMode(false);
        }
    };
    if (loading) {
        return (_jsxs("div", { className: styles.loadingContainer, children: [_jsx("div", { className: styles.loadingSpinner }), _jsx("p", { children: "Y\u00FCkleniyor..." })] }));
    }
    return (_jsx("div", { className: styles.profilePageContainer, children: !token ? (_jsxs("div", { className: styles.loginMessage, children: [_jsx("h2", { children: "Hesab\u0131n\u0131za Eri\u015Fin" }), _jsx("p", { children: "Bu sayfaya eri\u015Fmek i\u00E7in l\u00FCtfen giri\u015F yap\u0131n veya yeni bir hesap olu\u015Fturun." }), _jsxs("a", { href: "/login", className: styles.loginLink, children: [_jsx(FiLogIn, { size: 18 }), "Giri\u015F Yap"] })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.mainContent, children: profile && !editMode ? (_jsx(ProfileView, { profile: profile, onEdit: () => setEditMode(true) })) : (_jsx(ProfileForm, { token: token, existingProfile: profile || undefined, onSuccess: handleProfileUpdateSuccess })) }), _jsx(RightSidebar, {})] })) }));
};
export default ProfilePage;
