export const getLoacalStorage = (key: string) => {
  if (typeof window !== 'undefined') return localStorage.getItem(key);
};
