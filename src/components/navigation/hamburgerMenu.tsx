"use client";
import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import Hamburger from "hamburger-react";
import styles from "@styles/modules/_navbar.module.scss";
import { NavItemPage } from "@components/navigation/navItemPage";
import { NavItemSVG } from "@components/navigation/navItemSvg";
import { LinkedinSVG } from "@components/navigation/svgs/linkedinSVG";
import { GithubSVG } from "@components/navigation/svgs/githubSVG";
import { EmailSVG } from "@components/navigation/svgs/emailSVG";

export const HamburgerMenu = () => {
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const menuAnimation = useSpring({
        maxHeight: isOpen ? 200 : 0,
        opacity: isOpen ? 1 : 0,
        config: { tension: 200, friction: 20 },
    });

    return (
        <div className={styles.nav_collapsible} ref={menuRef}>
            <Hamburger toggled={isOpen} toggle={setOpen} />
            {/* Collapsible Nav Items (Modify as needed) */}
            <animated.div className={styles.nav_collapsible_menu} style={menuAnimation}>
                <NavItemPage
                    className={styles.nav_rightbar_pagelinks_pagelink}
                    href="about"
                />
                <NavItemPage
                    className={styles.nav_rightbar_pagelinks_pagelink}
                    href="about"
                />
                <NavItemPage
                    className={styles.nav_rightbar_pagelinks_pagelink}
                    href="about"
                />

                <div className={styles.nav_collapsible_menu_icons}>
                    <NavItemSVG
                        svg={<LinkedinSVG />}
                        className={styles.nav_rightbar_social}
                        href="https://www.linkedin.com/in/juantate/"
                    />
                    <NavItemSVG
                        svg={<GithubSVG />}
                        className={styles.nav_rightbar_social}
                        href="https://github.com/tatejuan12"
                    />
                    <NavItemSVG
                        svg={<EmailSVG />}
                        className={styles.nav_rightbar_social}
                        href="mailto: tatejuan11@gmail.com"
                    />
                </div>
            </animated.div>
        </div>
    );
};
