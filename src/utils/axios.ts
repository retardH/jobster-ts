import axios from "axios";

export const requestInstance = axios.create({
    baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
    timeout: 10000,
})