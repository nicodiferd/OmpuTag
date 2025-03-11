import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { firebaseConfig } from './config';

// Initialize Firebase
const firebaseApp = 
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Firebase services
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

// Analytics (only in browser environment)
export const initAnalytics = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getAnalytics(firebaseApp);
  }
  return null;
};

export default firebaseApp; 