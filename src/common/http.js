import Axios from 'axios';

const makeRequest = (method, url, data) => {
  const requestConfig = {
    method,
    url,
    data,
    headers: {},
  };

  if (data) {
    requestConfig.headers['Content-Type'] = 'application/json';
  }

  return Axios(requestConfig).catch((error) => {
    const errorMessage =
      error.response.data.errors && error.response.data.errors.length
        ? error.response.data.errors[0]
        : 'We are currently experiencing technical difficulties';

    throw new Error(errorMessage);
  });
};

export default {
  get: url => makeRequest('GET', url),
  post: (url, data) => makeRequest('POST', url, data),
};
