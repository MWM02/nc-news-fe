import { useState, useEffect } from "react";

const useApiRequest = (apiFunction, ...args) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFunction(...args)
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [...args]);

  return { data, isLoading, error };
};

export default useApiRequest;
