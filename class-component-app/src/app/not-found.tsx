'use client';
import Link from 'next/link';
import './[locale]/index.css'

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div
          className="flex flex-col justify-center items-center min-h-screen "
          style={{ fontSize: '1.5rem' }}
        >
          <h2>404: Page not found</h2>
          <p>The page you were looking for doesn't exist.</p>
          <Link href="/">
            <button
              className="underline cursor-pointer"
              style={{ fontSize: '1.2rem' }}
            >
              Return Home
            </button>
          </Link>
        </div>
      </body>
    </html>
  );
}
