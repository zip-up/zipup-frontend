import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Spinner from '@components/common/Spinner';
import { useUser } from '@hooks/queries/useAuth';
import { useGetFundingDetail } from '@hooks/queries/useFunding';
import { useRequestPayment, useStoreOrderInfo, useTossPayments } from '@hooks/queries/usePayment';
import { fundingFormState } from '@store/store';
import { nanoid } from 'nanoid';
import { useRecoilState } from 'recoil';
import { flex } from 'styled-system/patterns';

export default function Payment() {
  const router = useRouter();
  const [fundingForm] = useRecoilState(fundingFormState);
  const { data: user } = useUser();

  const { id: fundingId, method } = router.query as { id: string; method: string };

  const { data: fundingInfo } = useGetFundingDetail(fundingId);

  const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY;

  const { data: tossPayments } = useTossPayments(clientKey);

  const { mutate: handlePaymentRequest } = useRequestPayment();

  const { mutate: storeOrderInfo } = useStoreOrderInfo((orderId, amount) => {
    handlePaymentRequest({
      tossPayments,
      paymentMethod: method,
      fundingId,
      amount,
      orderId,
      customerName: user?.name || '',
      orderName: fundingInfo?.title || '',
    });
  });

  useEffect(() => {
    if (!fundingInfo) return;

    storeOrderInfo({
      orderId: nanoid(),
      amount: fundingForm.price,
    });
  }, [fundingInfo, fundingForm.price]);

  return (
    <div
      className={flex({
        m: '0 auto',
        h: '100%',
        alignItems: 'center',
        p: '1.6rem',
        mt: '6rem',
        height: 'calc(100vh - 6rem)',
        justifyContent: 'center',
      })}
    >
      <Spinner size="md" />
    </div>
  );
}
