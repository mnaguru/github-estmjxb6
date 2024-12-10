import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase/init';
import { handleFirebaseError } from '../lib/firebase/errors';
import type { Answer } from '../types';

export async function submitAnswers(profileId: string, answers: Answer[]) {
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
}

export async function getAssessmentByProfileId(profileId: string) {
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