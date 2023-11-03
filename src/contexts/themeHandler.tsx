import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export const useMyTheme = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const storage_theme = localStorage.getItem("theme")
    if (storage_theme) {
      setTheme(storage_theme);
    }
    else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme('light');
      }
      else setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
};