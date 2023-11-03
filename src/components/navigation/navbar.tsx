import styles from "@styles/modules/_navbar.module.scss";
import Image from "next/image";
import ThemeToggleButton from "@components/themeButton/themeToggleButton";
import { LogoSVG } from "./svgs/logoSVG";
import { LinkedinSVG } from "./svgs/linkedinSVG";
import { GithubSVG } from "./svgs/githubSVG";
import { EmailSVG } from "./svgs/emailSVG";
import { NavItem } from "./navitem";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_logo}>
        <LogoSVG className={styles.nav_logo_image} />
      </div>
      <div className={styles.nav_rightbar}>
        <a
          href="https://www.linkedin.com/in/juantate/"
          target="_blank"
          className={styles.nav_rightbar_social}
        >
          <NavItem svg={<LinkedinSVG />} />
        </a>
        <a
          href="https://github.com/tatejuan12"
          target="_blank"
          className={styles.nav_rightbar_social}
        >
          <NavItem svg={<GithubSVG />} />
        </a>
        <a
          href="mailto: tatejuan11@gmail.com"
          target="_blank"
          className={styles.nav_rightbar_social}
        >
          <NavItem svg={<EmailSVG />} />
        </a>
        <div className={styles.nav_rightbar_themetoggle}>
          <ThemeToggleButton
            className={styles.nav_rightbar_themetoggle_theme_toggle_button}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
