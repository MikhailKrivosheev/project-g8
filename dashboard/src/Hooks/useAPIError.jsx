import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

export default function useAPIError(setError) {
  const { enqueueSnackbar } = useSnackbar();

  const handleError = useCallback((error) => {
    if (error.status === 500) {
      enqueueSnackbar(error.data.error, {
        variant: 'error',
      });
    } else if (error.status === 400) {
      Object.entries(error.data.details).forEach(([key, errorText]) => {
        // setError(key, { type: 'manual', message: errorText[0] });
        enqueueSnackbar(errorText[0], { variant: 'error' });
      });
    } else if (error.logicsError) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  }, []);

  return { handleError };
}
