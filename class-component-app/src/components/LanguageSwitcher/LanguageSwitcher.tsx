'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '../../i18n/routing';
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: 'en' | 'ru') => {

    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={styles.languageSwitcher}>
      <button
        onClick={() => switchLanguage('en')}
        disabled={locale === 'en'}
        className={locale === 'en' ? 'active' : ''}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('ru')}
        disabled={locale === 'ru'}
        className={locale === 'ru' ? 'active' : ''}
      >
        RU
      </button>
    </div>
  );
}