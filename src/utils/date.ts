/**
 * paymentCard 컴포넌트에서 사용하기 위해 서버의 date 응답 형태를 변환하는 함수
 *
 * @param {string} _date - "YYYY-MM-DD HH:MM:SS"
 * @return [YYYY.MM.DD, HH:MM]
 */
export const formatDateTime = (_date: string) => {
  const [date, time] = _date.split(' ');

  return [date.split('-').join('.'), time.slice(0, 5)];
};
