import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FundingStatus } from '@typings/funding';

const PARTICIPATE_ALERT_MSG = {
  COMPLETED: '이미 달성된 펀딩으로 참여할 수 없습니다.',
  EXPIRED: '펀딩 기간이 만료되어 참여할 수 없습니다.',
};

export default function useFundingParticipationGuard(
  status: FundingStatus | undefined,
  isOrganizer?: boolean,
  fundingId?: string,
) {
  const router = useRouter();

  useEffect(() => {
    if (status === 'COMPLETED' || (status === 'EXPIRED' && !isOrganizer)) {
      alert(PARTICIPATE_ALERT_MSG[status]);
      router.push(`/funding/${fundingId}`);
    }
  }, [status]);

  return {
    isParticipationDenied: status === 'COMPLETED' || (status === 'EXPIRED' && !isOrganizer),
  };
}
