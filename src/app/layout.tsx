'use client';

import { Inter } from 'next/font/google';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ReactQueryProvider from '@/providers/ReactQueryProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
          <ReactQueryDevtools />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
