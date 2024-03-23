import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from '../types/propsChildren';

export default function ReactQueryClient({ children }: PropsWithChildren) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
    queryCache: new QueryCache({}),
    mutationCache: new MutationCache({}),
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
