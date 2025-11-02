import Image from 'next/image';
import styles from '../../app/[locale]/about/AboutPage.module.css';
import { useTranslations } from 'next-intl';

export default function Technologies() {
  const t = useTranslations('AboutPage.technologies');
  return (
    <div className={styles.container}>
      <div className={styles.infoText}>
        <h2 className={styles.title}>{t('title')}</h2>
        <p>{t('description')}</p>
      </div>
      <Image
        src="/images/technologies.png"
        alt="Technologies"
        width={500}
        height={500}
        className={styles.aboutImage}
      />
    </div>
  );
}
