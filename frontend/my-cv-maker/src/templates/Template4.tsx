import React from "react";
import styles from "./Template4.module.css";
import { CVData } from "../../types";

interface Props {
  data: CVData;
}

const Template4: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        {data.profile.photoUrl && (
          <img
            src={data.profile.photoUrl}
            alt="Profile"
            className={styles.photo}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        )}
        <h2>{data.profile.firstName} {data.profile.lastName}</h2>
        <p>{data.profile.email}</p>
        <p>{data.profile.birthDate}</p>
        {data.profile.summary && <p className={styles.summary}>{data.profile.summary}</p>}
      </aside>

      <main className={styles.content}>
        <section>
          <h3>Eğitim</h3>
          {data.educations.map((edu) => (
            <div key={edu.id} className={styles.item}>
              <strong>{edu.school}</strong> – {edu.degree}
              <div className={styles.dates}>{edu.startDate} - {edu.endDate}</div>
              <p>{edu.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h3>Deneyim</h3>
          {data.experiences.map((exp) => (
            <div key={exp.id} className={styles.item}>
              <strong>{exp.company}</strong> – {exp.jobTitle}
              <div className={styles.dates}>{exp.startDate} - {exp.endDate}</div>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h3>Yetenekler</h3>
          <ul>
            {data.skills.map((skill) => (
              <li key={skill.id}>{skill.name} – {skill.level}</li>
            ))}
          </ul>
        </section>

        {data.socialLinks.length > 0 && (
          <section>
            <h3>Sosyal Medya</h3>
            <ul>
              {data.socialLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.url} target="_blank" rel="noreferrer">{link.platform}</a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default Template4;
