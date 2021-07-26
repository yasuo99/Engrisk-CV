import examApiv2 from "../api/2.0/examApi";
import examApi from "../api/examApi"

export const getAllExam = () => {
    return examApi.getAll();
}
export const doExam = async (id) => {
    return await examApiv2.doExam(id);
}
export const doneExam = (id, body) => {
    return dispatch => {
        examApiv2.doneExam(id, body).then((response) => {
            return dispatch({ type: "SUBMIT_EXAM", result: response })
        }).catch((error) => {
            console.log(error);
        });
    }
}
export const getExam = id => {
    return examApi.getExam(id);
}
export const updateExam = (id, body) => {
    return examApi.updateExam(id, body);
}
export const deleteExam = (id) => {
    return examApi.deleteExam(id);
}
export const removeResult = () => {
    return dispatch => {
        return dispatch({type: 'REMOVE_RESULT'});
    }
}