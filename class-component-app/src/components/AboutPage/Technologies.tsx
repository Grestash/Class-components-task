import technologiesImage from 'assets/images/technologies.png';
import styles from '../../pages/AboutPage.module.css';
import useMediaQuery from 'hooks/useMediaQuery';

export default function Technologies() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={styles.container}>
      <div className={styles.infoText}>
        <h2>Technologies Used</h2>
        {isMobile && (
          <img src={technologiesImage} alt="Technologies image" className={styles.aboutImage} />
        )}
        <p>
          The app is built with React and TypeScript, making the code more
          organized and easier to work with. It uses React Router to let users
          move between pages without reloading. Data comes from a REST API, and
          everything runs smoothly thanks to Vite, which helps the app load and
          build really fast.
        </p>
      </div>
      {!isMobile && (
        <img src={technologiesImage} alt="Technologies image" className={styles.aboutImage} />
      )}
    </div>
  );
}
