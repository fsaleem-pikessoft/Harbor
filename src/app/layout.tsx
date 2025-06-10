import './globals.css';
import { Manrope } from 'next/font/google';
import LayoutWrapper from './components/LayoutWrapper';
import 'antd/dist/reset.css';
import { AuthProvider } from '@/context/AuthContext';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  title: 'Harbor',
  description: 'Investment Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
