import { useState, useEffect } from 'react';

interface ServiceFunc {
  (...params: any): Promise<any>;
}

export default function useFetch(service: ServiceFunc) {
  const [loading, setLoading] = useState(false);
  async function fetch(...params: any[]) {
    setLoading(true);
    try {
      await service(...params);
      setLoading(false);
    } catch (error) {
      console.log('error');
      setLoading(false);
    }
  }
  return { loading, fetch };
}

export function useAsyncData<T>(
  service: ServiceFunc,
  initialData: T,
  params?: any,
  condition = true
) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await service(params);

        setData(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    }

    condition && fetchData();
    // eslint-disable-next-line
  }, [params]);

  return { data, isLoading, isError, setData };
}
