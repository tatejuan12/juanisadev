import Image from "next/image";
import styles from "@styles/modules/_page.module.scss";
import { TypewriterGreeting } from "./typewriterGreeting";
import { Avatar } from "./avatar";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.hero_header}>
          <h1>{<TypewriterGreeting />}</h1>
          <h2>I&apos;m a programmer, problem solver, tinkerer</h2>
        </div>
        <div className={styles.hero_avatar}>
          <div className={styles.hero_avatar_container}>
            <div className={styles.hero_avatar_image}>{<Avatar />}</div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "red", minHeight: 300 }}> </div>
    </main>
  );
}
