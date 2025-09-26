import type { Metadata } from 'next';
import Provider from '../providers/Providers';
import './index.css'

export const metadata: Metadata = {
  title: 'Rick and Morty Character Search',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div id="root">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
