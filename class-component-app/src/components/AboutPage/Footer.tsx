import rssIcon from 'assets/icons/rss-logo.svg';
import githubIcon from 'assets/icons/github-mark.png';
import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <p>Created by Pavel Shliatskiy</p>
      <div className="links">
        <a href="https://rs.school/courses/reactjs">
          <img src={rssIcon} alt="RS School icon" className="footer-icon" />
        </a>
        <a href="https://github.com/Grestash">
          <img src={githubIcon} alt="GitHub icon" className="footer-icon" />
        </a>
      </div>
    </footer>
  );
}
