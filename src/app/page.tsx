import Image from "next/image";
import styles from "@styles/modules/_page.module.scss";
import { TypewriterGreeting } from "./typewriterGreeting";
import { Avatar } from "./avatar";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.hero_header}>
          <h2>{<TypewriterGreeting />}</h2>
          <h1>
            Hey there, welcome to a little part of
            <span className={styles.hero_header_gradient}> MY</span> galaxy!
          </h1>
        </div>
        <div className={styles.hero_avatar}>
          <div className={styles.hero_avatar_container}>
            <div className={styles.hero_avatar_image}>{<Avatar />}</div>
          </div>
        </div>
      </div>
      <div className={styles.hero_footer}>
        <h2>Want to know about my career, or want to know how I can help transform your idea into reality?</h2>
          <p>Ask Away!</p>
      </div>
    </main>
  );
}
