import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import styles from "./TemplatesPage.module.css";
import { templateList } from "../templates";
import { useNavigate } from "react-router-dom";
import { CVData } from "../../types";

const TemplatesPage: React.FC = () => {
  const [cvData, setCvData] = useState<CVData | null>(null);
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
      } catch (e) {
        console.error(e);
        setError("Veriler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <div className={styles.page}>Yükleniyor...</div>;
  if (error) return <div className={styles.page}>{error}</div>;

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Şablon Seç</h1>

      <div className={styles.cardGrid}>
        {templateList.map((template) => (
          <div
            key={template.id}
            className={styles.card}
            onClick={() => navigate(`/preview/${template.id}`)}
          >
            <div className={styles.thumbnailWrapper}>
              <div className={styles.scaleContainer}>
                <template.component data={cvData!} />
              </div>
            </div>
            <div className={styles.cardTitle}>{template.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
