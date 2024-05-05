import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomError } from '@typings/customError';
import { isAxiosError } from 'axios';

export default function ReactQueryClient({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleError = (error: Error) => {
    if (isAxiosError(error) && error.response?.data) {
      const customError = error.response.data as CustomError;

      const code = customError.code;

      if (!code) alert(customError);

      if (code && (code === 2102 || code === 2101)) return router.push('/404');

      alert(customError.message);

      router.push('/');
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
