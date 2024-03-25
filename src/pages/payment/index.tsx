import { useEffect } from 'react';
import { usePaymentWidget } from '@hooks/queries/usePaymentWidget';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

export default function Payment() {
  const router = useRouter();

  const { amount } = router.query as { amount: string };

  const widgetClientKey = process.env.NEXT_PUBLIC_CLIENT_KEY;
  const customerKey = 'NIFasERO7b3q-3VE-USyh';

  const { data: paymentWidget } = usePaymentWidget(widgetClientKey, customerKey);

  const handlePaymentRequest = async () => {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하기 위한 api call이 선행되야 함.

    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: '일리 캡슐 커피머신',
        customerName: '고나현',
        customerEmail: 'customer123@gmail.com',
        customerMobilePhone: '01012341234',
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      // snackbar 알림 띄우기
      console.error('Error requesting payment:', error);
    }
  };

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
      <button onClick={handlePaymentRequest}>결제하기</button>
    </>
  );
}
