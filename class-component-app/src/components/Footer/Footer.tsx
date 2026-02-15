import rssIcon from 'assets/icons/rss-logo.svg';
import githubIcon from 'assets/icons/github-mark.svg';
import githubIconWhite from 'assets/icons/github-mark-white.svg';
import './Footer.css';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  return (
    <div className={location.pathname === '/' ? 'footer-wrapper' : ''}>
      <footer className={location.pathname === '/' ? 'search-page-footer' : ''}>
        <p>Created by Pavel Shliatskiy</p>
        <div className="links">
          <a href="https://rs.school/courses/reactjs">
            <img src={rssIcon} alt="RS School icon" className="footer-icon" />
          </a>
          <a href="https://github.com/Grestash">
            <img
              src={location.pathname === '/' ? githubIconWhite : githubIcon}
              alt="GitHub icon"
              className="footer-icon"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}