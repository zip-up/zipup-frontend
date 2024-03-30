import type { AppProps } from 'next/app';
import '@styles/globals.css';
// import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import Layout from '@components/Layout';
import ReactQueryClient from '@contexts/ReactQueryContext';
import AuthRoot from '@components/Layout/AuthRoot';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const loadKakaoSDK = (callback: () => void) => {
    const existingScript = document.getElementById('kakao-js-sdk');
    if (!window.Kakao && !existingScript) {
      const script = document.createElement('script');
      script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js';
      script.integrity = 'sha384-x+WG2i7pOR+oWb6O5GV5f1KN2Ko6N7PTGPS7UlasYWNxZMKQA63Cj/B2lbUmUfuC';
      script.crossOrigin = 'anonymous';
      script.onload = callback;
      document.body.appendChild(script);
    } else if (window.Kakao && existingScript) {
      callback();
    }
  };

  useEffect(() => {
    loadKakaoSDK(() => {
      if (window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      }
    });
  }, []);

  return (
    <Layout>
      <RecoilRoot>
        <AuthRoot>
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
        </AuthRoot>
      </RecoilRoot>
    </Layout>
  );
}
