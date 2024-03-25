import { useMutation, useQuery } from '@tanstack/react-query';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';

const usePaymentWidget = (clientKey: string, customerKey: string) => {
  return useQuery<PaymentWidgetInstance>({
    queryKey: ['payment-widget', clientKey, customerKey],
    queryFn: async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      return paymentWidget;
    },
  });
};

const useRequestPayment = () => {
  return useMutation({
    mutationFn: ({ paymentWidget, id }: { paymentWidget?: PaymentWidgetInstance; id: string }) => {
      const REDIRECT_URL = `${window.location.origin}/funding/${id}/payment`;

      if (!paymentWidget) throw new Error('결제 서비스를 이용할 수 없습니다.');

      return paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: '일리 캡슐 커피머신',
        customerName: '고나현',
        customerEmail: 'customer123@gmail.com',
        customerMobilePhone: '01012341234',
        successUrl: `${REDIRECT_URL}/success`,
        failUrl: `${REDIRECT_URL}/fail`,
      });
    },
    onError: e => {
      console.log(e);
    },
  });
};

export { usePaymentWidget, useRequestPayment };
