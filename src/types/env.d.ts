namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_CLIENT_KEY: string;
    NEXT_PUBLIC_SECRET_KEY: string;
    NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY: string;
  }
}

interface Window {
  Kakao: any;
}
