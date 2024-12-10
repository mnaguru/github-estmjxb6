import axios from 'axios';
import type { FinancialProfile, ContactInfo, Assessment } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const assessmentApi = {
  submitProfile: async (profile: FinancialProfile) => {
    const { data } = await api.post<{ id: string }>('/profiles', profile);
    return data;
  },

  submitAnswers: async (profileId: string, answers: Array<{ questionId: string; value: number }>) => {
    const { data } = await api.post<Assessment>(`/profiles/${profileId}/assessment`, { answers });
    return data;
  },

  submitContact: async (profileId: string, contactInfo: ContactInfo) => {
    const { data } = await api.post<{ success: boolean }>(`/profiles/${profileId}/contact`, contactInfo);
    return data;
  },

  getResults: async (profileId: string) => {
    const { data } = await api.get<Assessment>(`/profiles/${profileId}/results`);
    return data;
  },
};