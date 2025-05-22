import React from "react";
import styles from "./Template3.module.css";
import { CVData } from "../../types";

interface Props {
  data: CVData;
}

const Template3: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.templateContainer}>
      <header className={styles.header}>
        <h1>{data.profile.firstName} {data.profile.lastName}</h1>
        <p>{data.profile.email} | {data.profile.birthDate}</p>
        {data.profile.summary && (
          <p className={styles.summary}>{data.profile.summary}</p>
        )}
      </header>

      <section className={styles.timelineSection}>
        <h2>Eğitim</h2>
        <div className={styles.timeline}>
          {data.educations.map((edu) => (
            <div key={edu.id} className={styles.timelineItem}>
              <div className={styles.dot}></div>
              <div className={styles.content}>
                <strong>{edu.school}</strong> - {edu.degree}
                <div className={styles.date}>{edu.startDate} – {edu.endDate}</div>
                <p>{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.timelineSection}>
        <h2>Deneyim</h2>
        <div className={styles.timeline}>
          {data.experiences.map((exp) => (
            <div key={exp.id} className={styles.timelineItem}>
              <div className={styles.dot}></div>
              <div className={styles.content}>
                <strong>{exp.company}</strong> - {exp.jobTitle}
                <div className={styles.date}>{exp.startDate} – {exp.endDate}</div>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.skillsSection}>
        <h2>Yetenekler</h2>
        <ul>
          {data.skills.map((skill) => (
            <li key={skill.id}>{skill.name} – {skill.level}</li>
          ))}
        </ul>
      </section>

      {data.socialLinks?.length > 0 && (
        <section className={styles.skillsSection}>
          <h2>Sosyal Medya</h2>
          <ul>
            {data.socialLinks.map((link) => (
              <li key={link.id}>
                <a href={link.url} target="_blank" rel="noreferrer">{link.platform}</a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Template3;
