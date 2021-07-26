
import callApi from '../config/apiCaller';

export const actFetchWordsRequest = () => {
    return dispatch => {
        return callApi('/Word', 'GET', null).then(res => {
            dispatch(actFetchWords(res.data));
        });
    };
}

export const actFetchWords = (words) => {
    return {
        type : 'FETCH_WORDS',
        words
    }
}
