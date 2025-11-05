import './Footer.css';
import Image from 'next/image';

export default function Footer(props: { pageType: string }) {
  return (
    <footer page-type={props.pageType}>
      <div className="footer-wrapper">
        <p className="footer-title">Created by Pavel Shliatskiy</p>
        <div className="links">
          <a href="https://rs.school/courses/reactjs">
            <Image
              src={'/icons/rss-logo.svg'}
              alt="RS School icon"
              className="footer-icon"
              width={50}
              height={50}
            />
          </a>
          <a href="https://github.com/Grestash">
            <Image
              src={
                props.pageType === 'search'
                  ? '/icons/github-mark-white.svg'
                  : '/icons/github-mark.svg'
              }
              alt="GitHub icon"
              className="footer-icon"
              width={50}
              height={50}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
