'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFirebase } from '@/context/FirebaseContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, auth } = useFirebase();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    );
  }

  // Don't render anything until authentication check is complete
  if (!user) {
    return null;
  }

  // Handle sign out
  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      import('firebase/auth').then(({ signOut }) => {
        signOut(auth).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">OmpuTag</h2>
          <p className="text-sm text-gray-500 mt-1 truncate">
            {user?.email}
          </p>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link 
                href="/dashboard" 
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/tags" 
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                My Tags
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/messages" 
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Messages
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/settings" 
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
} 