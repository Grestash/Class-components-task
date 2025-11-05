'use client';
import { useTheme } from 'context/ThemeContext';
import './ThemeToggle.css';
import Image from 'next/image';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2"
    >
      <Image
        src={theme === 'light' ? '/icons/sun.png' : '/icons/moon.png'}
        alt="ThemeIcon"
        className="theme-img"
        width={30}
        height={30}
      ></Image>
    </button>
  );
}
