import React from "react";
import styles from "./Template10.module.css";
import { CVData } from "../../types";

interface Props {
  data: CVData;
}

const Template10: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2>{data.profile.firstName} {data.profile.lastName}</h2>
        <p>{data.profile.email}</p>
        <p>{data.profile.birthDate}</p>
        {data.profile.summary && <p className={styles.summary}>{data.profile.summary}</p>}

        <div className={styles.section}>
          <h3>Yetenekler</h3>
          <ul>
            {data.skills.map(skill => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        </div>

        {data.socialLinks?.length > 0 && (
          <div className={styles.section}>
            <h3>İletişim</h3>
            <ul>
              {data.socialLinks.map(link => (
                <li key={link.id}>
                  <a href={link.url} target="_blank" rel="noreferrer">{link.platform}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className={styles.main}>
        <div className={styles.section}>
          <h3>Eğitim</h3>
          {data.educations.map(edu => (
            <div key={edu.id} className={styles.item}>
              <strong>{edu.school}</strong> – {edu.degree}
              <span>{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <h3>Projeler</h3>
          {data.experiences.map(exp => (
            <div key={exp.id} className={styles.projectCard}>
              <h4>{exp.jobTitle} @ {exp.company}</h4>
              <span className={styles.dates}>{exp.startDate} – {exp.endDate}</span>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Template10;
