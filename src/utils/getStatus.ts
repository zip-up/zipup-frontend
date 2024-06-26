export const getFundingStatus = (percent: number, expirationDate: number) => {
  if (percent >= 100) return 'COMPLETED';
  else if (expirationDate < 0) return 'EXPIRED';

  return 'IN_PROGRESS';
};
