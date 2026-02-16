import rickAndMortyLogo from 'assets/images/rick-and-morty-logo.png';
import styles from '../../pages/AboutPage.module.css';
import useMediaQuery from 'hooks/useMediaQuery';

export default function AppInfo() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={`${styles.container} ${styles.reverse}`}>
      <div className={styles.infoText}>
        <h2>About the Application</h2>
        {isMobile && (
            <img
              src={rickAndMortyLogo}
              alt="Rick and Morty logo image"
              className={`${styles.aboutImage} ${styles.reverse}`}
            />
          )}
        <p>
          Rick and Morty Character Search is a React application that allows
          users to search and explore characters from the Rick and Morty REST
          API, based on the television show Rick and Morty. Users can view
          detailed information about each character and easily navigate through
          results using pagination.
        </p>
      </div>

      {!isMobile && (
            <img
              src={rickAndMortyLogo}
              alt="Rick and Morty logo image"
              className={styles.aboutImage}
            />
          )}
    </div>
  );
}
