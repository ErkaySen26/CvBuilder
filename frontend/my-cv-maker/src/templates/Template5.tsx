import React from "react";
import styles from "./Template5.module.css";
import { CVData } from "../../types";

interface Props {
  data: CVData;
}

const Template5: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{data.profile.firstName} {data.profile.lastName}</h1>
        <p>{data.profile.email} | {data.profile.birthDate}</p>
        {data.profile.summary && <p className={styles.summary}>{data.profile.summary}</p>}
      </header>

      <div className={styles.section}>
        <h2>Eğitim</h2>
        {data.educations.map((edu) => (
          <div key={edu.id} className={styles.item}>
            <strong>{edu.school}</strong> – {edu.degree}
            <div className={styles.date}>{edu.startDate} - {edu.endDate}</div>
            <p>{edu.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2>Deneyim</h2>
        {data.experiences.map((exp) => (
          <div key={exp.id} className={styles.item}>
            <strong>{exp.company}</strong> – {exp.jobTitle}
            <div className={styles.date}>{exp.startDate} - {exp.endDate}</div>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2>Yetenekler</h2>
        <ul>
          {data.skills.map((skill) => (
            <li key={skill.id}>{skill.name} – {skill.level}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Template5;
