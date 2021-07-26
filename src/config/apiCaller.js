import axios from 'axios';

export const API_URL = 'https://5f9a835e9d94640016f70d07.mockapi.io/api';

export default function callApi(endpoint, method = 'GET', body){
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
};