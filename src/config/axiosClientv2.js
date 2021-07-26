import axios from 'axios';
import queryString from 'querystring';

const axiosClientv2 = axios.create({
    baseURL: process.env.REACT_APP_V2_API_URL,
    headers: {
        'content-type': 'application/json',
        'device-type': 'Browser'
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClientv2.interceptors.request.use(async (config) => {
    //Xử lý liên quan đến token ở đây
    return config;
});

axiosClientv2.interceptors.response.use((response) => {
    if(response && response.data){
        return response.data;
    }
    return response;
}, error => {
    throw error;
});

export default axiosClientv2;