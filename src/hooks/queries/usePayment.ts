import { useRouter } from 'next/router';
import { InstanceWithToken } from '@api/index';
import { useMutation, useQuery } from '@tanstack/react-query';
import { loadTossPayments, TossPaymentsInstance } from '@tosspayments/payment-sdk';
import { CancelInfoForm, PaymentInfo } from '@typings/funding';
import { isAxiosError } from 'axios';

const useTossPayments = (clientKey: string) => {
  return useQuery({
    queryKey: ['toss-payment'],
    queryFn: () => loadTossPayments(clientKey),
  });
};

const useStoreOrderInfo = (successCallback: (orderId: string, amount: number) => void) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ orderId, amount }: { orderId: string; amount: number }) => {
      // if (!paymentWidget) throw new Error('결제 서비스를 이용할 수 없습니다.');

      await InstanceWithToken.post(`/v1/payment/?orderId=${orderId}&amount=${amount}`);

      return { orderId, amount };
    },
    onSuccess: ({ orderId, amount }) => successCallback(orderId, amount),
    onError: error => {
      console.error('결제 정보 저장 요청 실패', error);

      if (isAxiosError(error)) {
        const { id } = router.query;

        router.push(`/funding/${id}/payment/fail?code=${error?.code}&message=${error.message}`);
      }
    },
  });
};

const useRequestPayment = () => {
  return useMutation({
    mutationFn: ({
      tossPayments,
      paymentMethod,
      fundingId,
      ...orderInfo
    }: {
      tossPayments?: TossPaymentsInstance;
      paymentMethod: string;
      fundingId: string;
      amount: number;
      orderId: string;
      orderName: string;
      customerName: string;
    }) => {
      const REDIRECT_URL = `${window.location.origin}/funding/${fundingId}/payment`;

      if (!tossPayments) throw new Error('결제 서비스를 이용할 수 없습니다.');

      return tossPayments?.requestPayment(paymentMethod, {
        fundingId,
        ...orderInfo,
        successUrl: `${REDIRECT_URL}/success`,
        failUrl: `${REDIRECT_URL}/fail`,
      });
    },
    onError: e => {
      console.error(e);
    },
  });
};

const useGetPaymentList = () => {
  return useQuery<PaymentInfo[]>({
    queryKey: ['payment-list'],
    queryFn: async () => {
      const response = await InstanceWithToken.get(`/v1/present/payment/list`);

      return response.data;
    },
  });
};

const useCancelPayment = () => {
  return useMutation({
    mutationFn: async ({ id, ...rest }: CancelInfoForm) => {
      const response = await InstanceWithToken.put('/v1/present/cancel', {
        paymentId: id,
        ...rest,
      });

      return response.data;
    },
  });
};

export {
  useTossPayments,
  useStoreOrderInfo,
  useRequestPayment,
  useGetPaymentList,
  useCancelPayment,
};
