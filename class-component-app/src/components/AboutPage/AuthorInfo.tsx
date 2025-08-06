import authorImage from 'assets/images/Author-image2.png'
import styles from '../../pages/AboutPage.module.css'

export default function AuthorInfo() {
    return (
      <div className={`${styles.container} ${styles.reverse}`}>
        <div className={styles.infoText}>
          <h2>About the Author</h2>
          <p>
            I am a second-year student at Belarusian State University of
            Informatics and Radioelectronics (BSUIR), currently studying
            Computer Engineering, specializing in programming hardware and
            developing software for embedded mobile systems. As a participant in
            the RS School React course, I am expanding my skills in modern
            frontend development.
          </p>
        </div>
        <img src={authorImage} alt="" className={styles.aboutImage}/>
      </div>
    )
}