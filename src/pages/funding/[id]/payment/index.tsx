import { useEffect } from 'react';
import { usePaymentWidget, useRequestPayment } from '@hooks/queries/usePayment';
import { useRouter } from 'next/router';

export default function Payment() {
  const router = useRouter();

  const { amount, id } = router.query as { amount: string; id: string };

  const widgetClientKey = process.env.NEXT_PUBLIC_CLIENT_KEY;
  const customerKey = 'NIFasERO7b3q-3VE-USyh';

  const { data: paymentWidget } = usePaymentWidget(widgetClientKey, customerKey);

  const { mutate: handlePaymentRequest } = useRequestPayment();

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
      <button onClick={() => handlePaymentRequest({ paymentWidget, id })}>결제하기</button>
    </>
  );
}
