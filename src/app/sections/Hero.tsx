import styles from "@styles/modules/_page.module.scss";
import {TypewriterGreeting} from "@app/parts/TypewriterGreeting";
import {Avatar} from "@app/parts/Avatar";

const Hero = () => {
    return (
    <div className={styles.hero}>
        <div className={styles.hero_header}>
            <h2>{<TypewriterGreeting/>}</h2>
            <h1>
                Hey there, welcome to a little part of
                <span className={styles.hero_header_gradient}> MY</span> galaxy!
            </h1>
        </div>
        <div className={styles.hero_avatar}>
            <div className={styles.hero_avatar_container}>
                <div className={styles.hero_avatar_image}>{<Avatar/>}</div>
            </div>
        </div>
    </div>
    )
}

export default Hero;