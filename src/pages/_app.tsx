import type { AppProps } from 'next/app';
import '@styles/globals.css';
// import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import Layout from '@components/Layout';
import ReactQueryClient from '@contexts/ReactQueryContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <RecoilRoot>
          <ReactQueryClient>
            <Component {...pageProps} />
            {/* <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar={false}
              closeOnClick
              rtl={false}
              theme="light"
            /> */}
          </ReactQueryClient>
        </RecoilRoot>
      </Layout>
    </>
  );
}
