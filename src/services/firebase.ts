import { 
  collection,
  addDoc,
  getDocs,
  query,
  where,
  type DocumentData,
  serverTimestamp,
  type Timestamp
} from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { db } from '../lib/firebase';
import type { FinancialProfile, ContactInfo, Answer, Assessment } from '../types';

export interface AssessmentRecord {
  profile: FinancialProfile;
  answers: Answer[];
  assessment: Assessment;
  contactInfo: ContactInfo;
  createdAt: Timestamp;
}

export class FirebaseApiError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: FirebaseError
  ) {
    super(message);
    this.name = 'FirebaseApiError';
  }
}

function handleFirebaseError(error: unknown): never {
  if (error instanceof FirebaseError) {
    console.error('Firebase operation failed:', error.code, error.message);
    
    switch (error.code) {
      case 'permission-denied':
        throw new FirebaseApiError(
          'Unable to save data at this time. Please try again.',
          'PERMISSION_DENIED',
          error
        );
      case 'unavailable':
        throw new FirebaseApiError(
          'Service is temporarily unavailable. Please try again in a few minutes.',
          'SERVICE_UNAVAILABLE',
          error
        );
      case 'failed-precondition':
        throw new FirebaseApiError(
          'Unable to complete the operation. Please refresh and try again.',
          'FAILED_PRECONDITION',
          error
        );
      case 'resource-exhausted':
        throw new FirebaseApiError(
          'Too many requests. Please wait a moment before trying again.',
          'RESOURCE_EXHAUSTED',
          error
        );
      default:
        throw new FirebaseApiError(
          'An error occurred while saving your data. Please try again.',
          'UNKNOWN_ERROR',
          error
        );
    }
  }
  
  console.error('Non-Firebase error occurred:', error);
  throw new FirebaseApiError(
    'An unexpected error occurred. Please try again.',
    'UNKNOWN_ERROR'
  );
}

export const firebaseApi = {
  async submitProfile(profile: FinancialProfile) {
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
  },

  async submitAnswers(profileId: string, answers: Answer[]) {
    try {
      const docRef = await addDoc(collection(db, 'assessments'), {
        profileId,
        answers,
        createdAt: serverTimestamp(),
        status: 'completed'
      });
      return { id: docRef.id };
    } catch (error) {
      console.error('Error submitting answers:', error);
      throw handleFirebaseError(error);
    }
  },

  async submitContact(profileId: string, contactInfo: ContactInfo) {
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
  },

  async getAssessmentByProfileId(profileId: string): Promise<DocumentData | null> {
    try {
      const q = query(
        collection(db, 'assessments'),
        where('profileId', '==', profileId),
        where('status', '==', 'completed')
      );
      
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return null;
      
      return querySnapshot.docs[0].data();
    } catch (error) {
      console.error('Error fetching assessment:', error);
      throw handleFirebaseError(error);
    }
  }
};