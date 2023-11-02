import axios from 'axios';
import { setLoading } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from './storage';

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

export const requestInstance = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
  timeout: 5000,
});

requestInstance.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();
    if (user) {
      config.headers['authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const request = (
  method: string,
  url: string,
  payload?: any,
  config?: any
): any => {
  let response: Promise<any>;
  store.dispatch(setLoading(true));
  if (method === 'post') {
    response = requestInstance.post(url, payload, config);
  } else if (method === 'get') {
    response = requestInstance.get(url, { params: payload, ...config });
  } else if (method === 'put') {
    response = requestInstance.put(url, payload);
  } else if (method === 'patch') {
    response = requestInstance.patch(url, payload, config);
  } else if (method === 'delete') {
    response = requestInstance.delete(url, {
      params: payload,
      ...config,
    });
  }

  return new Promise((resolve, reject) => {
    response
      .then((res) => {
        resolve(res);
        store.dispatch(setLoading(false));
      })
      .catch((err) => {
        reject(err);
        console.log(err);

        // toast.error(err.response.data.msg);
        store.dispatch(setLoading(false));
      });
  });
};
