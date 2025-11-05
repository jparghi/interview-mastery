import { useEffect, useState } from 'react';

export function useDarkMode(initial = false) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') {
      return initial;
    }
    const stored = window.localStorage.getItem('interview-mastery-theme');
    if (stored !== null) {
      return stored === 'dark';
    }
    return initial;
  });

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('interview-mastery-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return [isDark, setIsDark];
}
