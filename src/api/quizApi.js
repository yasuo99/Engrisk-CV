import axiosClient from '../config/axiosClient';
const quizApi = {
    getAll: (params) => {
        const url = "/quizzes";
        return axiosClient.get(url, { params });
    },
    getDetail: (id) => {
        const url = `/quizzes/${id}`;
        return axiosClient.get(url, {validateStatus: () => true});
    },
    create: (body) => {
        const url = "/quizzes";
        return axiosClient.post(url, body)
    },
    doQuiz: (id) => {
        let token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer "+ token
        }
        console.log(headers);
        const url = `sections/${id}/do`;
        return axiosClient.get(url,{headers: headers});
    },
    doneQuiz: (id, body) => {
        let token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer "+token
        }
        const url = `/quizzes/${id}/done`;
        return axiosClient.post(url,{headers});
    }
    ,
    update: (id, body) => {
        const url = `/quizzes/${id}`;
        return axiosClient.put(url, body);
    },
    delete: (id, body) => {
        const url = `/quizzes/${id}`;
        return axiosClient.delete(url, body);
    },
    addQuestionToquiz: (quizId, questionId) => {
        const url = `/quizzes/${quizId}/questions/${questionId}`;
        return axiosClient.put(url);
    }
}
export default quizApi;