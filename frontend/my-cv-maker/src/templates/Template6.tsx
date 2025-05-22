import React from "react";
import styles from "./Template6.module.css";
import { CVData } from "../../types";

interface Props {
    data: CVData;
}

const Template6: React.FC<Props> = ({ data }) => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.box}>
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
                </div>

                <div className={styles.box}>
                    <h3>Yetenekler</h3>
                    <ul>
                        {data.skills.map(skill => (
                            <li key={skill.id}>{skill.name} – {skill.level}</li>
                        ))}
                    </ul>
                </div>

                {data.socialLinks.length > 0 && (
                    <div className={styles.box}>
                        <h3>Sosyal Medya</h3>
                        <ul>
                            {data.socialLinks.map(link => (
                                <li key={link.id}>
                                    <a href={link.url} target="_blank" rel="noreferrer">{link.platform}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className={styles.right}>
                <div className={styles.box}>
                    <h3>Eğitim</h3>
                    {data.educations.map(edu => (
                        <div key={edu.id} className={styles.item}>
                            <strong>{edu.school}</strong> – {edu.degree}
                            <div className={styles.date}>{edu.startDate} – {edu.endDate}</div>
                            <p>{edu.description}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.box}>
                    <h3>Deneyim</h3>
                    {data.experiences.map(exp => (
                        <div key={exp.id} className={styles.item}>
                            <strong>{exp.company}</strong> – {exp.jobTitle}
                            <div className={styles.date}>{exp.startDate} – {exp.endDate}</div>
                            <p>{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Template6;
