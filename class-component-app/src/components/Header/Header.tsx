import './Header.css';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import ThemeToggle from 'components/ThemeToggle/ThemeToggle';
import LanguageSwitcher from 'components/LanguageSwitcher/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();

  return (
    <header>
      <nav>
        <Link href={`/${locale}`} className="nav-link">
          {t('home')}
        </Link>
        <Link href={`/${locale}/about`} className="nav-link">
          {t('about')}
        </Link>
      </nav>
      <div className="setting-wrapper">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
