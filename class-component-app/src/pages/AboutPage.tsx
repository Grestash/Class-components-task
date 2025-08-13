import AppInfo from '../components/AboutPage/AppInfo';
import Technologies from '../components/AboutPage/Technologies';
import AuthorInfo from '../components/AboutPage/AuthorInfo';
import Footer from '../components/AboutPage/Footer';
import styles from '../pages/AboutPage.module.css';
import Header from 'components/Header/Header';

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className={styles.aboutWrapper}>
        <AppInfo />
        <Technologies />
        <AuthorInfo />
        <Footer />
      </div>
    </>
  );
}
