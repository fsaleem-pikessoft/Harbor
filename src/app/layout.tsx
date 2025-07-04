'use client';
import './globals.css';
import { Manrope } from 'next/font/google';
import LayoutWrapper from './components/LayoutWrapper';
import 'antd/dist/reset.css';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
            <ToastContainer />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
