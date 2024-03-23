import { PretendardBold, PretendardRegular, PretendardSemiBold } from '@styles/font';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>ZIPup | 집들이 선물 펀딩 서비스</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style>
        {`
          :root {
            --font-pretendard-bold: ${PretendardBold.style.fontFamily};
            --font-pretendard-semibold: ${PretendardSemiBold.style.fontFamily};
            --font-pretendard-regular: ${PretendardRegular.style.fontFamily};
          }
        `}
      </style>
      <main />
    </>
  );
}
