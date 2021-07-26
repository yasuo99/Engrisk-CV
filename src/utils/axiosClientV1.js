import axios from 'axios';
import queryString from 'querystring';
import {BaseApiUrlV1} from '../constants/api';

const axiosClientV1 = axios.create({
    baseURL: BaseApiUrlV1,
    headers: {
        'content-type': 'application/json',
        'device-type': 'App'
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClientV1.interceptors.request.use(async (config) => {
    //Xử lý liên quan đến token ở đây
    return config;
});

axiosClientV1.interceptors.response.use((response) => {
    if(response && response.data){
        return response.data;
    }
    return response;
}, error => {
    throw error;
});

export default axiosClientV1;