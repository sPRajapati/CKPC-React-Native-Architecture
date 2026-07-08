import axios from 'axios';

/** Normalizes unknown errors (Axios, Error, string) into a display message. */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      (error.response?.data as { message?: string } | undefined)?.message ??
      error.message
    );
  }
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Something went wrong';
};
