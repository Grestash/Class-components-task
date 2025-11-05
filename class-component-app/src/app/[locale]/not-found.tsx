"use client"
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className='flex flex-col justify-center items-center min-h-screen ' style={{fontSize: '1.5rem'}}>
      <h2>404: {t('title')}</h2>
      <p >{t('description')}</p>
      <Link href="/" ><button className='underline cursor-pointer' style={{fontSize: '1.2rem'}}>{t('home')}</button></Link>
    </div>
  );
}
