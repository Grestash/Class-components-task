import './Footer.css';

export default function Footer(props: { pageType: string }) {
  return (
    <footer page-type={props.pageType}>
      <div className="footer-wrapper">
        <p className="footer-title">Created by Pavel Shliatskiy</p>
        <div className="links">
          <a href="https://rs.school/courses/reactjs">
            <img
              src="/icons/rss-logo.svg"
              alt="RS School icon"
              className="footer-icon"
            />
          </a>
          <a href="https://github.com/Grestash">
            <img
              src={
                props.pageType === 'search'
                  ? '/icons/github-mark-white.svg'
                  : '/icons/github-mark.svg'
              }
              alt="GitHub icon"
              className="footer-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
