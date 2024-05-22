import { ErrorPage } from '@components/CustomError';

export default function Custom404() {
  return (
    <ErrorPage
      code="404"
      title="찾으시는 페이지가 없습니다"
      contents={
        <>
          <p>잘못된 접근이거나 요청하신 페이지를 찾을 수 없어요.</p>
          <p>입력하신 페이지의 주소가 정확한지 확인해주세요.</p>
        </>
      }
    />
  );
}
