import { toast } from 'react-toastify';
import wordApi from '../api/wordApi';

export const getAllWord = (params) => {
    return  wordApi.getAll(params).then(response => {
        return response;
    }).catch(error => {
        toast(error.response.data.error)
    });
}
export const getWord = (id) => wordApi.getDetail(id);

export const updateWord = (id, body) => {
    return wordApi.update(id,body);
}
export const deleteWord = (id) =>  wordApi.delete(id);

export const createWord = async (body) =>  {
    return await wordApi.create(body).then(response => {
        toast('Thêm từ vựng thành công');
        return response
    }).catch((error) => {
        toast(error.response.data.error)
    })
};
export const wordPractice = (body) => {
    return dispatch => dispatch({type: "PRACTICE" , words: body});
}
export const donePractice = () => {
    return dispatch => dispatch({type: "DONE"})
}