import axios from 'axios';
import { polyfill } from 'es6-promise';

polyfill();

export default function apiClient(req, clientConfig) {
  if (__SERVER__) {
    const client = axios.create({
      baseURL: `http://${clientConfig.host}:${clientConfig.port}`
    });

    client.interceptors.request.use(config => {
      config.headers['cookie'] = req.headers.cookie; // eslint-disable-line
      return config;
    }, (error) => Promise.reject(error));
    return client;
  }

  return axios;
}
