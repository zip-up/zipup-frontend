export const getLoacalStorage = (key: string) => {
  if (typeof window == 'undefined') return;

  const data = localStorage.getItem(key) || 'null';

  return JSON.parse(data);
};

export const setLocalStorage = (key: string, data: any) => {
  if (typeof window == 'undefined') return;

  localStorage.setItem(key, JSON.stringify(data));
};