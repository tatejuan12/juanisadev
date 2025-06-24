import styles from "@styles/modules/_page.module.scss";
import resumeData from "./resume.json"
import {Skill, SkillCategoryProps, SkillProps} from "@components/journey/experiences/Skill";


export default function Skills() {
    return (
        <div className={styles.journey_skills}>
            <h2>My Skills</h2>
            <div className={styles.journey_skills_data}>
                {resumeData.skills.map((skillCategory, index) => (
                    // <SkillCategoryProps
                    //     key={index}
                    //     name={skillCategory.name}
                    //     skills={skillCategory.items}
                    // />
                    <div key={index} className={styles.journey_skills_data_category}>
                        <div className={styles.journey_skills_data_category_header}>{skillCategory.name}</div>
                        <div className={styles.journey_skills_data_category_buttons}>
                            {skillCategory.items.map((skill, index) => (
                                <Skill key={index} name={skill.name}></Skill>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}