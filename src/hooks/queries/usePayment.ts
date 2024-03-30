import { Instance } from '@api/index';
import { useMutation, useQuery } from '@tanstack/react-query';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
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

      const response = await Instance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/payment/?orderId=${orderId}&amount=${amount}`,
      );

      return orderId;
    },
    onSuccess: (orderId: string) => successCallback(orderId),
    onError: error => {
      console.log('결제 정보 저장 요청 실패', error);

      const { id } = router.query;

      router.push(`/funding/${id}/payment/fail?code=${error?.code}&message=${error.message}`);
    },
  });
};

const useRequestPayment = () => {
  return useMutation({
    mutationFn: ({
      paymentWidget,
      fundingId,
      orderId,
      orderName,
      customerName,
    }: {
      paymentWidget?: PaymentWidgetInstance;
      fundingId: string;
      orderId: string;
      orderName: string;
      customerName: string;
    }) => {
      const REDIRECT_URL = `${window.location.origin}/funding/${fundingId}/payment`;

      if (!paymentWidget) throw new Error('결제 서비스를 이용할 수 없습니다.');

      return paymentWidget?.requestPayment({
        orderId,
        orderName,
        customerName,
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
