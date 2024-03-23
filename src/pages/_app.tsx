import type { AppProps } from 'next/app';
import '@styles/globals.css';
import ReactQueryClient from '@contexts/ReactQueryContext';
import Layout from '@components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <ReactQueryClient>
          <Component {...pageProps} />
        </ReactQueryClient>
      </Layout>
    </>
  );
}
