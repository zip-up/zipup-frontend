export const fetchAPI = {
  get: (endPoint: string) => fetch(endPoint).then((data) => data.json()),
};
