import { FirebaseError } from 'firebase/app';

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

export function handleFirebaseError(error: unknown): never {
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