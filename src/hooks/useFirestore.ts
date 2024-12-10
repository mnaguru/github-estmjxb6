import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FirebaseApiError } from '../lib/firebase/errors';
import { submitProfile } from '../services/profiles';
import { submitAnswers } from '../services/assessments';
import { submitContact } from '../services/contacts';
import type { FinancialProfile, ContactInfo, Answer } from '../types';

const getErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseApiError) {
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
};

export function useFirestore() {
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(null);

  const profileMutation = useMutation({
    mutationFn: async (profile: FinancialProfile) => {
      try {
        const result = await submitProfile(profile);
        return result;
      } catch (error) {
        console.error('Profile mutation error:', error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: (data) => {
      setCurrentProfileId(data.id);
    },
  });

  const answersMutation = useMutation({
    mutationFn: async ({ answers }: { answers: Answer[] }) => {
      if (!currentProfileId) {
        throw new Error('Please complete your profile first');
      }
      try {
        return await submitAnswers(currentProfileId, answers);
      } catch (error) {
        console.error('Answers mutation error:', error);
        throw new Error(getErrorMessage(error));
      }
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (contactInfo: ContactInfo) => {
      if (!currentProfileId) {
        throw new Error('Please complete your profile first');
      }
      try {
        return await submitContact(currentProfileId, contactInfo);
      } catch (error) {
        console.error('Contact mutation error:', error);
        throw new Error(getErrorMessage(error));
      }
    },
  });

  return {
    submitProfile: profileMutation.mutateAsync,
    submitAnswers: answersMutation.mutateAsync,
    submitContact: contactMutation.mutateAsync,
    currentProfileId,
    isLoading: 
      profileMutation.isPending || 
      answersMutation.isPending || 
      contactMutation.isPending,
    error: 
      profileMutation.error || 
      answersMutation.error || 
      contactMutation.error,
  };
}