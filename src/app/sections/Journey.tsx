import styles from "@styles/modules/_page.module.scss";
import Experiences from "@components/journey/experiences/Experiences";
import Skills from "@components/journey/experiences/Skills";

export default function Journey() {
    return (
        <div className={styles.journey}>
            <Experiences/>
            <Skills/>
        </div>

    );
}