"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // onError: (error, query) => {
    //   console.log(error, query);
    //   // 🎉 only show error toasts if we already have data in the cache
    //   // which indicates a failed background update
    //   // if (query.state.data !== undefined) {

    //   // }
    // },
  }),
});

type RQCProps = {
  children: React.ReactNode;
};

export default function ReactQueryClient({ children }: RQCProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
