import quizApi from '../api/quizApi';
export const getAllQuiz = () => {
    return quizApi.getAll();
}
export const getQuiz = (id) => {
    return quizApi.getDetail(id);
}
export const doQuiz = (id) => {
    return quizApi.doQuiz(id);
}
export const submitQuiz = (id,body) => {
    return quizApi.submitQuiz(id,body);
}