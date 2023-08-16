export const fetchAPI = {
  get: (endPoint: string) =>
    fetch(process.env.NEXT_PUBLIC_BASE_URL + endPoint)
      .then((data) => data.json())
      .catch((err) => console.error(err)),

  put: (endPoint: string, body: any) =>
    fetch(process.env.NEXT_PUBLIC_BASE_URL + endPoint, {
      method: "PUT",
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .catch((err) => console.error(err)),

  post: (endPoint: string, body: any) =>
    fetch(process.env.NEXT_PUBLIC_BASE_URL + endPoint, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .catch((err) => console.error(err)),
};
