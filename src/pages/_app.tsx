import type { AppProps } from 'next/app';
import '@styles/globals.css';
import ReactQueryClient from '@contexts/ReactQueryContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ReactQueryClient>
        <Component {...pageProps} />
      </ReactQueryClient>
    </>
  );
}
