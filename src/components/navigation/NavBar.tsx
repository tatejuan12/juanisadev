import styles from "@styles/modules/_navbar.module.scss";
import ThemeToggleButton from "@components/themeButton/themeToggleButton";
import { useState } from "react";
import { LogoSVG } from "./svgs/logoSVG";
import { LinkedinSVG } from "./svgs/linkedinSVG";
import { GithubSVG } from "./svgs/githubSVG";
import { EmailSVG } from "./svgs/emailSVG";
import { NavItemSvg } from "./NavItemSvg";
import { NavItemPage } from "./NavItemPage";
import { HamburgerMenu } from "./HamburgerMenu";
const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_logo}>
        <LogoSVG className={styles.nav_logo_image} />
      </div>
      <div className={styles.nav_rightbar}>
        <div className={styles.nav_rightbar_pagelinks}>
          <NavItemPage
            className={styles.nav_rightbar_pagelinks_pagelink}
            href="about"
          ></NavItemPage>
        </div>
        <NavItemSvg
          svg={<LinkedinSVG />}
          className={styles.nav_rightbar_social}
          href="https://www.linkedin.com/in/juan-tate/"
        />
        <NavItemSvg
          svg={<GithubSVG />}
          className={styles.nav_rightbar_social}
          href="https://github.com/tatejuan12"
        />
        <NavItemSvg
          svg={<EmailSVG />}
          className={styles.nav_rightbar_social}
          href="mailto: tatejuan11@gmail.com"
        />
        <div className={styles.nav_rightbar_themetoggle}>
          <ThemeToggleButton
            className={styles.nav_rightbar_themetoggle_theme_toggle_button}
          />
        </div>
        <HamburgerMenu />
      </div>
    </nav>
  );
};

export default NavBar;
