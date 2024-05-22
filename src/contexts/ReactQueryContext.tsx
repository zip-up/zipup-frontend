import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { API_ERROR_MESSAGE } from '@constants/apiError';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomError } from '@typings/customError';
import { isAxiosError } from 'axios';
import Cookies from 'js-cookie';

export default function ReactQueryClient({ children }: { children: ReactNode }) {
  const router = useRouter();

  const clearToken = () => {
    localStorage.clear();
    Cookies.remove('token');
  };

  const handleDefaultError = (status: number) => {
    if (status === 404 || status === 500) return router.push(`/${status}`);

    alert(API_ERROR_MESSAGE.DEFAULT);
    router.push('/');
  };

  const handleCustomError = (customError: CustomError) => {
    const code = customError.code as keyof typeof API_ERROR_MESSAGE;

    if (code === 2006) clearToken();
    if (code === 3001 || code === 3002) return router.push('/404');
    if (code === 5002) return router.push('/500');

    alert(API_ERROR_MESSAGE[code] || API_ERROR_MESSAGE.DEFAULT);
    router.push('/');
  };

  const handleError = (error: Error) => {
    if (isAxiosError(error) && error.response?.data) {
      const errorResponse = error.response.data;

      if (!errorResponse.code) return handleDefaultError(errorResponse.status);

      handleCustomError(errorResponse);
    }
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false, retry: 0 },
    },
    queryCache: new QueryCache({
      onError: handleError,
    }),
    mutationCache: new MutationCache({
      onError: handleError,
    }),
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
