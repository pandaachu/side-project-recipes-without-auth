import './globals.css';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import SessionAuthProvider from '@/context/providers/SessionAuthProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

interface LayoutProps {
  children: React.ReactNode;
  // auth: React.ReactNode;
  // admin?: React.ReactNode; // 使用可選參數
}

export const metadata: Metadata = {
  title: 'Recipe',
  description: 'Recipe',
};

export default async function RootLayout({ children }: LayoutProps) {
  const currentUser = 'HI';

  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: '#191919',

            // Alias Token
            // colorBgContainer: '#f6ffed',
            colorText: '#1D1D1f',
            colorTextHeading: '#1D1D1f',
            colorTextBase: '#1D1D1f',
          },
          components: {
            Button: {
              // 移除按鈕陰影
              primaryShadow: 'none',
            },
          },
        }}
      >
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AntdRegistry>
            <Header session={currentUser} />
            <SessionAuthProvider session={currentUser}>
              {/* 減除 header footer */}
              <main
                style={{ minHeight: 'calc(100vh - 110px)' }}
                className="flex w-full items-center justify-center pt-[80px]"
              >
                {children}
              </main>
            </SessionAuthProvider>
            <Footer />
          </AntdRegistry>
        </body>
      </ConfigProvider>
    </html>
  );
}
