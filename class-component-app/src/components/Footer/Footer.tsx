'use client'
import './Footer.css';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  return (
    <div className={pathname === '/' ? 'footer-wrapper' : ''}>
      <footer className={pathname === '/' ? 'search-page-footer' : ''}>
        <p>Created by Pavel Shliatskiy</p>
        <div className="links">
          <a href="https://rs.school/courses/reactjs">
            <img src="/icons/rss-logo.svg" alt="RS School icon" className="footer-icon" />
          </a>
          <a href="https://github.com/Grestash">
            <img
              src={pathname === '/' ? "/icons/github-mark-white.svg" : "/icons/github-mark.svg"}
              alt="GitHub icon"
              className="footer-icon"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
