import Axios from 'axios';

import { server } from '@/constant/env/index';

const client = Axios.create({
  baseURL: server,
  transformRequest(data) {
    if (!data) {
      return;
    }
    if (data.constractor === FormData) {
      return data;
    }

    return Object.entries(data)
      .filter(([, v]) => v !== undefined && v !== null)
      .reduce((pre, [k, v]) => pre.append(k, v) || pre, new FormData());
  }
});

const request = async (url, { data, method, ...config } = {}) => {
  const response = await client.request({
    url,
    method: method || (data ? 'post' : 'get'),
    data,
    ...config
  });
  const result = response.data;
  // 业务判断逻辑
  return result;
};

const req = (url, { headers, method, data }) => {
  return fetch(url, {
    headers,
    method,
    body: JSON.stringify(data)
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => res);
};

export default request;
export { req };
