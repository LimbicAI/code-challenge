const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

type ErrorType = Error & { response?: Response };

export const checkStatus = (response: Response) => {
  if (response.status >= 200 && response.status <= 204) {
    return response;
  }

  const error: ErrorType = new Error(response.statusText);
  error.response = response;
  throw error;
};

export const post = async (url: string, data: Record<string, any>) => {
  return fetch(url, {
    method: 'post',
    cache: 'no-store',
    headers,
    body: JSON.stringify(data),
  }).then(checkStatus);
};

export const put = async (url: string, data: Record<string, any>) => {
  return fetch(url, {
    method: 'put',
    cache: 'no-store',
    headers,
    body: JSON.stringify(data),
  }).then(checkStatus);
};
