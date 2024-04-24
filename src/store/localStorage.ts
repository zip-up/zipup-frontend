export const getLoacalStorage = (key: string) => {
  if (typeof window == 'undefined') return;

  try {
    const data = localStorage.getItem(key) || 'null';

    return JSON.parse(data);
  } catch (error) {
    console.log(error);

    localStorage.clear();
    alert('데이터를 가져오는 동안 에러가 발생했습니다.');

    window.location.href = '/';
  }
};

export const setLocalStorage = (key: string, data: any) => {
  if (typeof window == 'undefined') return;

  localStorage.setItem(key, JSON.stringify(data));
};