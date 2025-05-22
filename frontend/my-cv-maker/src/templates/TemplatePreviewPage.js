import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { templateList } from "../templates";
import axios from "../api/axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "./TemplatePreviewPage.module.css";
const TemplatePreviewPage = () => {
    const { id } = useParams();
    const templateId = parseInt(id || "", 10);
    const selectedTemplate = templateList.find((t) => t.id === templateId);
    const [cvData, setCvData] = useState(null);
    const previewRef = useRef(null);
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
            catch (err) {
                console.error("Veri yüklenemedi", err);
            }
        };
        fetchAll();
    }, []);
    const handleDownloadPDF = async () => {
        if (!previewRef.current)
            return;
        const canvas = await html2canvas(previewRef.current, {
            scale: 2,
            useCORS: true,
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("cv.pdf");
    };
    if (!selectedTemplate || !cvData)
        return _jsx("div", { children: "\u015Eablon bulunamad\u0131..." });
    return (_jsxs("div", { className: styles.page, children: [_jsx("div", { className: styles.preview, ref: previewRef, children: _jsx(selectedTemplate.component, { data: cvData }) }), _jsx("button", { className: styles.downloadButton, onClick: handleDownloadPDF, children: "PDF \u0130ndir" })] }));
};
export default TemplatePreviewPage;
