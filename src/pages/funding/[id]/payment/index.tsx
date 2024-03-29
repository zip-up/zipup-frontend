import { useEffect } from 'react';
import { usePaymentWidget, useRequestPayment, useStoreOrderInfo } from '@hooks/queries/usePayment';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

export default function Payment() {
  const router = useRouter();

  const { amount = 25000, id: fundingId } = router.query as { amount: string; id: string };

  const widgetClientKey = process.env.NEXT_PUBLIC_CLIENT_KEY;
  const customerKey = 'NIFasERO7b3q-3VE-USyh';

  const { data: paymentWidget } = usePaymentWidget(widgetClientKey, customerKey);

  // todo:: 결제 상품 및 결제자 정보 fetch

  const { mutate: handlePaymentRequest } = useRequestPayment();

  const { mutate: storeOrderInfo } = useStoreOrderInfo((orderId: string) =>
    handlePaymentRequest({ paymentWidget, fundingId, orderId }),
  );

  useEffect(() => {
    if (!paymentWidget) return;

    paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: Number(amount) },
      { variantKey: 'DEFAULT' },
    );

    paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });
  }, [paymentWidget]);

  return (
    <>
      <div id="payment-widget" />
      <div id="agreement" />
      <button
        onClick={() => {
          storeOrderInfo({
            orderId: nanoid(),
            amount: Number(amount),
          });
        }}
      >
        결제하기
      </button>
    </>
  );
}
