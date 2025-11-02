import Image from 'next/image';
import styles from '../../app/[locale]/about/AboutPage.module.css';
import { useTranslations } from 'next-intl';

export default function AuthorInfo() {
  const t = useTranslations('AboutPage.author');

  return (
    <div className={`${styles.container} ${styles.reverse}`}>
      <div className={styles.infoText}>
        <h2 className={styles.title}>{t('title')}</h2>
        <p>{t('description')}</p>
      </div>
      <Image
        src="/images/Author-image.png"
        alt="Author image"
        width={500}
        height={500}
        className={styles.aboutImage}
      />
    </div>
  );
}
