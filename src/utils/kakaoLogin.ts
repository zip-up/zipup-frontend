export const handleLogin = async () => {
  window.location.href =
    process.env.NEXT_PUBLIC_BASE_URL.slice(0, -4) + '/oauth2/authorization/kakao';
};
