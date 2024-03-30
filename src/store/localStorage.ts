export const getLoacalStorage = (key: string) => {
  if (typeof window == 'undefined') return;

  const data = localStorage.getItem(key) || '';

  return key != '@token' ? JSON.parse(data) : data;
};

export const setLocalStorage = (key: string, data: any) => {
  if (typeof window == 'undefined') return;

  localStorage.setItem(key, JSON.stringify(data));
};