/* eslint-disable no-unused-vars */
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IError } from 'Types';

// TODO type this hook

type TSetApiErrorState = string | null;

interface IErrorField {
  type?: string;
  message?: string;
}

interface IUseApiErrorProps<T = string> {
  setError?: (
    name: T,
    data: IErrorField,
    config?: { shouldFocus: boolean }
  ) => void;
}

export default function useAPIError<T = string>(
  methods: IUseApiErrorProps<T> | null = null
) {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<TSetApiErrorState>();

  const handleAPIError = useCallback((error: IError) => {
    if (error.abortError) {
      console.error('Request was canceled');
    } else if (error.status === 500) {
      setApiError(error?.data?.error);
    } else if (
      error.status === 400 &&
      error.data?.error === 'Validation errors' &&
      methods?.setError
    ) {
      Object.entries(error.data.details).forEach(([key, errorText]) => {
        methods?.setError?.(key, { type: 'manual', message: errorText });
      });
    } else if (error.status === 404) {
      navigate('/404');
    } else if (error.status === 200) {
      setApiError(error.message);
    }
  }, []);

  const clearError = () => {
    setApiError(null);
  };

  return { handleAPIError, apiError, clearError };
}
