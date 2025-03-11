'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage, initAnalytics } from '@/services/firebase';

interface FirebaseContextType {
  auth: Auth;
  db: any; // Firestore
  storage: any; // Storage
  user: User | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize analytics
    const setupAnalytics = async () => {
      await initAnalytics();
    };
    setupAnalytics();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    auth,
    db,
    storage,
    user,
    loading,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}; 