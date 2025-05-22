import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { templateList } from "../templates";
import axios from "../api/axios";
import { CVData } from "../../types";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "./TemplatePreviewPage.module.css";

const TemplatePreviewPage: React.FC = () => {
  const { id } = useParams();
  const templateId = parseInt(id || "", 10);
  const selectedTemplate = templateList.find((t) => t.id === templateId);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

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
      } catch (err) {
        console.error("Veri yüklenemedi", err);
      }
    };
    fetchAll();
  }, []);

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
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

  if (!selectedTemplate || !cvData) return <div>Şablon bulunamadı...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.preview} ref={previewRef}>
        <selectedTemplate.component data={cvData} />
      </div>
      <button className={styles.downloadButton} onClick={handleDownloadPDF}>
        PDF İndir
      </button>
    </div>
  );
};

export default TemplatePreviewPage;
