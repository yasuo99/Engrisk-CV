import axios from 'axios';
import queryString from 'querystring';
import {BaseApiUrl} from '../constants/api';

const axiosClient = axios.create({
    baseURL: BaseApiUrl,
    headers: {
        'content-type': 'application/json',
        'device-type': 'App'
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    //Xử lý liên quan đến token ở đây
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if(response && response.data){
        return response.data;
    }
    return response;
}, error => {
    throw error;
});

export default axiosClient;