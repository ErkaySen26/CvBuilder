import React from "react";
import styles from "./Template11.module.css";
import { CVData } from "../../types";

interface Props {
  data: CVData;
}

const Template11: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.page}>
      <h1 className={styles.name}>{data.profile.firstName} {data.profile.lastName}</h1>
      <p className={styles.contact}>{data.profile.email} | {data.profile.birthDate}</p>
      {data.profile.summary && <p className={styles.summary}>{data.profile.summary}</p>}

      <section>
        <h2 className={styles.h2}>Eğitim</h2>
        {data.educations.map(edu => (
          <div key={edu.id} className={styles.block}>
            <strong>{edu.school}</strong> – {edu.degree}
            <span>{edu.startDate} – {edu.endDate}</span>
            <p>{edu.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className={styles.h2}>Deneyim</h2>
        {data.experiences.map(exp => (
          <div key={exp.id} className={styles.block}>
            <strong>{exp.company}</strong> – {exp.jobTitle}
            <span>{exp.startDate} – {exp.endDate}</span>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className={styles.h2}>Yetenekler</h2>
        <p>{data.skills.map(s => s.name).join(" • ")}</p>
      </section>

      {data.socialLinks.length > 0 && (
        <section>
          <h2 className={styles.h2}>Sosyal Medya</h2>
          <p>{data.socialLinks.map(l => l.platform).join(" / ")}</p>
        </section>
      )}
    </div>
  );
};

export default Template11;
