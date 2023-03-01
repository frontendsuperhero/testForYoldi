export const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .catch((error) => console.log(error.status));
