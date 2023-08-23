export const fetchAPI = {
  get: (endPoint: string) =>
    fetch(endPoint)
      .then((data) => data.json())
      .catch((err) => console.error(err)),

  put: (endPoint: string, body: any) =>
    fetch(endPoint, {
      method: "PUT",
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .catch((err) => console.error(err)),

  post: (endPoint: string, body: any, needStringify: boolean = true) =>
    fetch(endPoint, {
      method: "POST",
      body: needStringify ? JSON.stringify(body) : body,
    })
      .then((data) => data.json())
      .catch((err) => console.error(err)),
};
