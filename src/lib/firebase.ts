import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAgLboa6HZoLyV1Ga4OjotToNy24z_Oo54",
  authDomain: "what-is-my-risk-number.firebaseapp.com",
  projectId: "what-is-my-risk-number",
  storageBucket: "what-is-my-risk-number.firebasestorage.app",
  messagingSenderId: "132870510228",
  appId: "1:132870510228:web:7ed93781e317745bf14681",
  measurementId: "G-8CQ094C82T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics in browser environment only
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Enable offline persistence
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support persistence.');
      }
    });
}