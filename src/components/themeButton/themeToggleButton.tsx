"use client"
import { useEffect, useRef, useState } from 'react';
import { useMyTheme } from '@contexts/themeHandler';
import { motion, useAnimation } from 'framer-motion';
import { darkModePath, lightModePath } from './paths';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '@styles/modules/_navbar.module.scss'



const ThemeToggleButton = ({ className }) => {
  const { theme, toggleTheme } = useMyTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return <Skeleton height={25} width={25} />;
  const variants = {
    visible: { animate: { scale: 1, rotate: 0 }, transition: { type: "spring", duration: 0.5, stiffness: 260, damping: 20 } },
    hidden: { animate: { scale: 0, rotate: 0 }, transition: { type: "linear", duration: 0.25, stiffness: 260, damping: 20 } },
  };

  return (
    <div className={`${className} ${theme}`} onClick={toggleTheme}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={22} height={22}>
        <motion.path
          fill="currentColor"
          d={darkModePath}
          initial={theme === "dark" ? variants.visible.animate : variants.hidden.animate}
          animate={theme === "dark" ? variants.visible.animate : variants.hidden.animate}
          transition={theme === "dark" ? variants.visible.transition : variants.hidden.transition}
        />
        <motion.path className={"dark"}
          fill="currentColor"
          d={lightModePath}
          initial={theme === "light" ? variants.visible.animate : variants.hidden.animate}
          animate={theme === "light" ? variants.visible.animate : variants.hidden.animate}
          transition={theme === "light" ? variants.visible.transition : variants.hidden.transition}
        />
      </svg>
    </div>
  );
};

export default ThemeToggleButton;