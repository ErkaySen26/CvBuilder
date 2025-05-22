import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styles from './RightSidebar.module.css';
import { FiBriefcase, FiBook, FiCode, FiLink } from 'react-icons/fi';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import SocialLinksForm from './SocialLinkForm';
const tabs = [
    { key: 'experience', title: 'Deneyim', icon: _jsx(FiBriefcase, {}) },
    { key: 'education', title: 'Eğitim', icon: _jsx(FiBook, {}) },
    { key: 'skills', title: 'Yetenekler', icon: _jsx(FiCode, {}) },
    { key: 'social', title: 'Sosyal', icon: _jsx(FiLink, {}) }
];
const RightSidebar = ({ token }) => {
    const [activeTab, setActiveTab] = useState(null);
    const toggleTab = (key) => {
        setActiveTab(prev => (prev === key ? null : key));
    };
    const renderTabContent = (key) => {
        switch (key) {
            case 'experience':
                return _jsx(ExperienceForm, { token: token });
            case 'education':
                return _jsx(EducationForm, { token: token });
            case 'skills':
                return _jsx(SkillsForm, { token: token });
            case 'social':
                return _jsx(SocialLinksForm, { token: token });
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: styles.sidebarContainer, children: [_jsx("div", { className: styles.tabRow, children: tabs.map(tab => (_jsxs("button", { onClick: () => toggleTab(tab.key), className: `${styles.tabButton} ${activeTab === tab.key ? styles.active : ''}`, children: [tab.icon, _jsx("span", { children: tab.title })] }, tab.key))) }), activeTab && (_jsx("div", { className: styles.tabContent, children: renderTabContent(activeTab) }))] }));
};
export default RightSidebar;
