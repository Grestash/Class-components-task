import authorImage from 'assets/images/Author-image2.png';
import styles from '../../pages/AboutPage.module.css';
import useMediaQuery from 'hooks/useMediaQuery';

export default function AuthorInfo() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={`${styles.container} ${styles.reverse}`}>
      <div className={styles.infoText}>
        <h2>About the Author</h2>
        {isMobile && (
          <img
            src={authorImage}
            alt="Author image"
            className={`${styles.aboutImage} ${styles.reverse}`}
          />
        )}
        <p>
          I am a second-year student at Belarusian State University of
          Informatics and Radioelectronics (BSUIR), currently studying Computer
          Engineering, specializing in developing software for embedded mobile
          systems. As a participant in the RS School React course, I am
          expanding my skills in modern frontend development.
        </p>
      </div>
      {!isMobile && (
        <img
          src={authorImage}
          alt="Author image"
          className={styles.aboutImage}
        />
      )}
    </div>
  );
}
