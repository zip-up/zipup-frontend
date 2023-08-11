export const fetchAPI = {
  get: (endPoint: string) =>
    fetch(process.env.NEXT_PUBLIC_BASE_URL + endPoint)
      .then((data) => data.json())
      .catch((err) => console.error(err)),
};
