import questionApi from "../api/questionApi"

export const getAllQuestion = () => {
    return questionApi.getAll();
}
export const getQuestion = (id) => {
    return questionApi.getDetail(id);
}
export const submitQuestion = (id, body) => questionApi.submitQuestion(id, body);
export const createQuestion = (body) => questionApi.createQuestion(body);
export const deleteQuestion = (id) => questionApi.deleteQuestion(id);