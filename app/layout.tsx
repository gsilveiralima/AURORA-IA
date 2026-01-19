import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Aurora AI',
  description: 'Your private virtual companion.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}