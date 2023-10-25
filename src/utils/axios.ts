import axios from "axios";
import { store } from "../features/store";
import { setLoading } from "../features/user/userSlice";

export const requestInstance = axios.create({
    baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
    timeout: 10000,
})

requestInstance.interceptors.request.use((config) => {
    store.dispatch(setLoading(true));
    return config;
}, error => {
    Promise.reject(error);
})

requestInstance.interceptors.response.use((config) => {
    console.log('response config', config);
    store.dispatch(setLoading(false));
    return config;
}, error => {
    return Promise.reject(error);
})


export const request = (method: string, url: string, payload: any, config: any) => {
    if (method === 'post') {
        requestInstance.post(url, payload, config);
    } else if (method === 'put') {
        requestInstance.put(url, payload);
    } else if (method === 'patch') {
        requestInstance.patch(url, payload);
    } else if (method === 'delete') {
        requestInstance.delete(url, {
            params: payload,
            ...config,
        })
    }
}