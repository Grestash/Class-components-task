import type { Metadata } from 'next';
import Provider from '../../providers/Providers';
import './index.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from 'i18n/routing';

export const metadata: Metadata = {
  title: 'Rick and Morty Character Search',
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <Provider>
          <NextIntlClientProvider messages={messages}>
            <div id="root">{children}</div>
          </NextIntlClientProvider>
        </Provider>
      </body>
    </html>
  );
}
