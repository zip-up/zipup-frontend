import { useMutation, useQuery } from '@tanstack/react-query';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import axios from 'axios';
import { useRouter } from 'next/router';

const usePaymentWidget = (clientKey: string, customerKey: string) => {
  return useQuery<PaymentWidgetInstance>({
    queryKey: ['payment-widget', clientKey, customerKey],
    queryFn: async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      return paymentWidget;
    },
  });
};

const useStoreOrderInfo = (successCallback: (orderId: string) => void) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ orderId, amount }: { orderId: string; amount: number }) => {
      // if (!paymentWidget) throw new Error('결제 서비스를 이용할 수 없습니다.');

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/payment/?orderId=${orderId}&amount=${amount}`,
        null,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      );

      return orderId;
    },
    onSuccess: (orderId: string) => {
      console.log(orderId);
      successCallback(orderId);
    },
    onError: e => {
      console.log('결제 정보 저장 요청 실패', e);

      router.push(
        `/funding/${router.query.id}/payment/fail?code=${router.query.id}&message=${router.query.id}`,
      );
    },
  });
};

const useRequestPayment = () => {
  return useMutation({
    mutationFn: ({
      paymentWidget,
      fundingId,
      orderId,
    }: {
      paymentWidget?: PaymentWidgetInstance;
      fundingId: string;
      orderId: string;
    }) => {
      const REDIRECT_URL = `${window.location.origin}/funding/${fundingId}/payment`;

      if (!paymentWidget) throw new Error('결제 서비스를 이용할 수 없습니다.');

      return paymentWidget?.requestPayment({
        orderId,
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

export { usePaymentWidget, useStoreOrderInfo, useRequestPayment };
