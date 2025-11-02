'use client';

import AppInfo from '../../../components/AboutPage/AppInfo';
import Technologies from '../../../components/AboutPage/Technologies';
import AuthorInfo from '../../../components/AboutPage/AuthorInfo';
import Footer from '../../../components/Footer/Footer';
import styles from './AboutPage.module.css';
import Header from 'components/Header/Header';
import { useTheme } from 'context/ThemeContext';

export default function AboutPage() {
  const {theme} = useTheme()

  return (
    <>
      <Header />
      <div className={`${styles.aboutWrapper} ${theme === 'dark' ? styles.dark : styles.light}`}>
        <AppInfo />
        <Technologies />
        <AuthorInfo />
      </div>
      <Footer pageType='about'/>
    </>
  );
}
