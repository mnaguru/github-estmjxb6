import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase/init';
import { handleFirebaseError } from '../lib/firebase/errors';
import type { ContactInfo } from '../types';

export async function submitContact(profileId: string, contactInfo: ContactInfo) {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      profileId,
      ...contactInfo,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    return { id: docRef.id };
  } catch (error) {
    console.error('Error submitting contact info:', error);
    throw handleFirebaseError(error);
  }
}