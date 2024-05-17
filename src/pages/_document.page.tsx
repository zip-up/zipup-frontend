import { Head, Html, Main, NextScript } from 'next/document';
import { pretendard } from '@styles/font';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js"
          integrity="sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01"
          crossOrigin="anonymous"
          defer
        ></script>
      </Head>
      <body className={pretendard.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
