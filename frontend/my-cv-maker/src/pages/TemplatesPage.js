import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import styles from "./TemplatesPage.module.css";
import { templateList } from "../templates";
import { useNavigate } from "react-router-dom";
const TemplatesPage = () => {
    const [cvData, setCvData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [prof, edus, exps, skills, socials] = await Promise.all([
                    axios.get("/profile"),
                    axios.get("/educations"),
                    axios.get("/experiences"),
                    axios.get("/skills"),
                    axios.get("/social-links"),
                ]);
                setCvData({
                    profile: prof.data,
                    educations: edus.data,
                    experiences: exps.data,
                    skills: skills.data,
                    socialLinks: socials.data,
                });
            }
            catch (e) {
                console.error(e);
                setError("Veriler yüklenirken bir hata oluştu.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);
    if (loading)
        return _jsx("div", { className: styles.page, children: "Y\u00FCkleniyor..." });
    if (error)
        return _jsx("div", { className: styles.page, children: error });
    return (_jsxs("div", { className: styles.page, children: [_jsx("h1", { className: styles.heading, children: "\u015Eablon Se\u00E7" }), _jsx("div", { className: styles.cardGrid, children: templateList.map((template) => (_jsxs("div", { className: styles.card, onClick: () => navigate(`/preview/${template.id}`), children: [_jsx("div", { className: styles.thumbnailWrapper, children: _jsx("div", { className: styles.scaleContainer, children: _jsx(template.component, { data: cvData }) }) }), _jsx("div", { className: styles.cardTitle, children: template.name })] }, template.id))) })] }));
};
export default TemplatesPage;
