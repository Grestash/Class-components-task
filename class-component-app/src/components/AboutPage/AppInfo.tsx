import Image from 'next/image';
import styles from '../../app/[locale]/about/AboutPage.module.css';
import { useTranslations } from 'next-intl';

export default function AppInfo() {
  const t = useTranslations('AboutPage.appInfo');

  return (
    <div className={`${styles.container} ${styles.reverse}`}>
      <div className={styles.infoText}>
        <h2 className={styles.title}>{t('title')}</h2>
        <p>
        {t('description')}
        </p>
      </div>
      <Image
        src="/images/rick-and-morty-logo.png"
        alt="Rick and Morty logo image"
        width={500}
        height={500}
        className={styles.aboutImage}
      />
    </div>
  );
}
