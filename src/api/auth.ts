import { InstanceWithToken } from '.';

export const getNewToken = () => InstanceWithToken.post(`/v1/auth/refresh`);
