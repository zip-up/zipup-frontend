import { InstanceWithToken } from '@api/index';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface ShippingData {
  roadAddress: string;
  detailAddress: string;
  phoneNumber: string;
}

const useGetShipping = () => {
  return useQuery<ShippingData>({
    queryKey: ['shipping'],
    queryFn: async () => {
      const response = await InstanceWithToken.get('/v1/user/pickup');

      return response.data;
    },
  });
};

const usePatchShipping = ({
  successHandler,
}: {
  successHandler: (data: { id: string }) => void;
}) => {
  return useMutation({
    mutationFn: async (data: ShippingData) => {
      const response = await InstanceWithToken.patch('/v1/user/pickup', data);

      return response.data;
    },
    onSuccess: successHandler,
  });
};

export { useGetShipping, usePatchShipping };
