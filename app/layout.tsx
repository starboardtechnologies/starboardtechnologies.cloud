import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
  title: 'starboardtechnologies.cloud',
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 p-0`}
        style={{
          fontFamily: "'Bebas Neue', sans-serif", // Directly applying the font
          backgroundColor: '#2c2c2c',
          color: 'white',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
        }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}