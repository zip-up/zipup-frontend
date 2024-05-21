import { ErrorPage } from '@components/CustomError';

export default function Custom500() {
  return (
    <ErrorPage
      code="500"
      title="페이지를 표시할 수 없습니다."
      contents={<p>서버에서 오류가 발생해 페이지를 표시할 수 없습니다.</p>}
    />
  );
}
