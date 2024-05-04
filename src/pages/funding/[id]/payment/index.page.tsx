import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@components/common/Button';
import { useUser } from '@hooks/queries/useAuth';
import { useGetFundingDeatil } from '@hooks/queries/useFunding';
import { usePaymentWidget, useRequestPayment, useStoreOrderInfo } from '@hooks/queries/usePayment';
import { fundingFormState } from '@store/store';
import { nanoid } from 'nanoid';
import { useRecoilState } from 'recoil';
import { css } from 'styled-system/css';

export default function Payment() {
  const router = useRouter();
  const [fundingForm] = useRecoilState(fundingFormState);
  const { data: user } = useUser();

  const { id: fundingId } = router.query as { id: string };

  const { data: fundingInfo } = useGetFundingDeatil(fundingId);

  const widgetClientKey = process.env.NEXT_PUBLIC_CLIENT_KEY;
  const customerKey = user?.id || '';

  const { data: paymentWidget } = usePaymentWidget(widgetClientKey, customerKey);

  const { mutate: handlePaymentRequest } = useRequestPayment();

  const { mutate: storeOrderInfo } = useStoreOrderInfo((orderId: string) =>
    handlePaymentRequest({
      paymentWidget,
      fundingId,
      orderId,
      customerName: user?.name || '',
      orderName: fundingInfo?.title || '',
    }),
  );

  useEffect(() => {
    if (!paymentWidget) return;

    paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: fundingForm.price },
      { variantKey: 'DEFAULT' },
    );

    paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });
  }, [paymentWidget]);

  return (
    <div className={css({ display: 'flex', flexDir: 'column', p: '1.6rem' })}>
      <div id="payment-widget" />
      <div id="agreement" />
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
