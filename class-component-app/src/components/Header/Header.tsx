'use client'
import './Header.css';
import Link from 'next/link';
import ThemeToggle from 'components/ThemeToggle/ThemeToggle';
import { useTheme } from 'context/ThemeContext';

export default function Header() {
  const {theme} = useTheme()
    return (
    <header>
      <nav>
      <Link href="/" className={`nav-link ${theme}`}>
          Character Search
        </Link>
        <Link href="/about" className={`nav-link ${theme}`}>
          About the App
        </Link>
      </nav>
      <ThemeToggle></ThemeToggle>
    </header>
  );
}
