import useSWR, { SWRConfiguration } from 'swr';

const defaultInit: SWRConfiguration = {
  revalidateOnFocus: false,
};

const useApi = <T>(resource: string, init?: SWRConfiguration) => {
  const { data, error, ...rest } = useSWR<T>(resource, {
    ...defaultInit,
    ...init,
  });

  return {
    data,
    error,
    isFetching: !data && !error,
    ...rest,
  };
};

export default useApi;
