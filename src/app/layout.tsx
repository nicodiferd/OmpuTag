import type { Metadata } from 'next';
import '@/styles/globals.css';
import { FirebaseProvider } from '@/context/FirebaseContext';

export const metadata: Metadata = {
  title: 'OmpuTag - Smart NFC Tag Management',
  description: 'Secure way to manage your NFC tags and facilitate return of lost items',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FirebaseProvider>
          {children}
        </FirebaseProvider>
      </body>
    </html>
  );
} 