import styles from "@styles/modules/_page.module.scss";
import React from "react";

export interface SkillCategoryProps {
    name: string,
    skills: SkillProps[]
}

export interface SkillProps {
    name: string
}

export const Skill: React.FC<SkillProps> = ({name}: SkillProps) => {
    return (
        <div className={styles.journey_skills_data_category_buttons_button}>
            {name}
        </div>
    );
};