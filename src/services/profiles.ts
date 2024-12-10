import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase/init';
import { handleFirebaseError } from '../lib/firebase/errors';
import type { FinancialProfile } from '../types';

export async function submitProfile(profile: FinancialProfile) {
  try {
    const docRef = await addDoc(collection(db, 'profiles'), {
      ...profile,
      createdAt: serverTimestamp(),
      status: 'active'
    });
    return { id: docRef.id };
  } catch (error) {
    console.error('Error submitting profile:', error);
    throw handleFirebaseError(error);
  }
}