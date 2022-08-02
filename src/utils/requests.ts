const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const post = async (url: string, data: Record<string, any>) => {
  return fetch(url, {
    method: 'post',
    cache: 'no-store',
    headers,
    body: JSON.stringify(data),
  });
};

export const put = async (url: string, data: Record<string, any>) => {
  return fetch(url, {
    method: 'put',
    cache: 'no-store',
    headers,
    body: JSON.stringify(data),
  });
};
