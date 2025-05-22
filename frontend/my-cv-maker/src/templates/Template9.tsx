import React from "react";
import styles from "./Template9.module.css";
import { CVData } from "../../types";

interface Props {
  data: CVData;
}

const Template9: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {data.profile.photoUrl && (
          <img
            src={data.profile.photoUrl}
            alt="Profile"
            className={styles.photo}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        )}
        <div>
          <h1>{data.profile.firstName} {data.profile.lastName}</h1>
          <p>{data.profile.email} | {data.profile.birthDate}</p>
          {data.profile.summary && <p className={styles.summary}>{data.profile.summary}</p>}
        </div>
      </header>

      <section>
        <h2>Yetenekler</h2>
        <div className={styles.featureGrid}>
          {data.skills.map(skill => (
            <div key={skill.id} className={styles.featureCard}>
              <h3>{skill.name}</h3>
              <span className={styles.level}>{skill.level}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Eğitim</h2>
        <div className={styles.featureGrid}>
          {data.educations.map(edu => (
            <div key={edu.id} className={styles.featureCard}>
              <h3>{edu.school}</h3>
              <p>{edu.degree}</p>
              <small>{edu.startDate} – {edu.endDate}</small>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Deneyim</h2>
        <div className={styles.featureGrid}>
          {data.experiences.map(exp => (
            <div key={exp.id} className={styles.featureCard}>
              <h3>{exp.company}</h3>
              <p>{exp.jobTitle}</p>
              <small>{exp.startDate} – {exp.endDate}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Template9;
