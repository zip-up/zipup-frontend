import { useQuery } from '@tanstack/react-query';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';

const usePaymentWidget = (clientKey: string, customerKey: string) => {
  return useQuery({
    queryKey: ['payment-widget', clientKey, customerKey],
    queryFn: async () => {
      return loadPaymentWidget(clientKey, customerKey);
    },
  });
};

export { usePaymentWidget };
