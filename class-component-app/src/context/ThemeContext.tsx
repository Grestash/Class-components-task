'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined')
      return localStorage.getItem('theme') as Theme;
    return 'light';
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    setTheme(savedTheme || 'light');
    document.documentElement.classList.add(savedTheme);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return isLoaded ? (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  ) : null;
};
