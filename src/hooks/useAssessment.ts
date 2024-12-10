import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assessmentApi } from '../services/api';
import type { FinancialProfile, ContactInfo, Answer } from '../types';

export function useAssessment() {
  const queryClient = useQueryClient();

  const profileMutation = useMutation({
    mutationFn: assessmentApi.submitProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const answersMutation = useMutation({
    mutationFn: ({ profileId, answers }: { profileId: string; answers: Answer[] }) =>
      assessmentApi.submitAnswers(profileId, answers),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessment'] });
    },
  });

  const contactMutation = useMutation({
    mutationFn: ({ profileId, contactInfo }: { profileId: string; contactInfo: ContactInfo }) =>
      assessmentApi.submitContact(profileId, contactInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact'] });
    },
  });

  return {
    submitProfile: profileMutation.mutateAsync,
    submitAnswers: answersMutation.mutateAsync,
    submitContact: contactMutation.mutateAsync,
    isLoading: profileMutation.isPending || answersMutation.isPending || contactMutation.isPending,
    error: profileMutation.error || answersMutation.error || contactMutation.error,
  };
}