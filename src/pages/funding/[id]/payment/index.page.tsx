import { useRouter } from 'next/router';
import Button from '@components/common/Button';
import { useUser } from '@hooks/queries/useAuth';
import { useGetFundingDetail } from '@hooks/queries/useFunding';
import { useRequestPayment, useStoreOrderInfo, useTossPayments } from '@hooks/queries/usePayment';
import { fundingFormState } from '@store/store';
import { nanoid } from 'nanoid';
import { useRecoilState } from 'recoil';
import { css } from 'styled-system/css';

export default function Payment() {
  const router = useRouter();
  const [fundingForm] = useRecoilState(fundingFormState);
  const { data: user } = useUser();

  const { id: fundingId } = router.query as { id: string };

  const { data: fundingInfo } = useGetFundingDetail(fundingId);

  const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY;

  const { data: tossPayments } = useTossPayments(clientKey);

  const { mutate: handlePaymentRequest } = useRequestPayment();

  const { mutate: storeOrderInfo } = useStoreOrderInfo((orderId, amount) =>
    handlePaymentRequest({
      tossPayments,
      paymentMethod: '카드',
      fundingId,
      amount,
      orderId,
      customerName: user?.name || '',
      orderName: fundingInfo?.title || '',
    }),
  );

  return (
    <div className={css({ display: 'flex', flexDir: 'column', p: '1.6rem' })}>
      <Button
        isBottomFixed
        onClick={() => {
          storeOrderInfo({
            orderId: nanoid(),
            amount: fundingForm.price,
          });
        }}
      >
        결제하기
      </Button>
    </div>
  );
}
