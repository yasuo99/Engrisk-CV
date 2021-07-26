import axiosClient from "../config/axiosClient"

const examApi = {
    getAll: (params) => {
        const url = "/exams";
        return axiosClient.get(url, { params });
    },
    getManage: () => {
        const url = "exams/manage";
        return axiosClient.get(url);
    },
    getRanking: () => {
        const url = 'exams/accounts/ranking';
        return axiosClient.get(url);
    },
    getExam: (id) => {
        const url = `/exams/${id}`;
        return axiosClient.get(url);
    },
    doExam: (id) => {
        let token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        const url = `/exams/${id}/do`;
        return axiosClient.get(url, { headers });
    },
    getAnswer: (id) => {
        const url = `/exams/${id}/answers`;
        return axiosClient.get(url);
    },
    getHistories: (id) => {
        const url = `/exams/histories/${id}`;
        return axiosClient.get(url);
    },
    create: (body) => {
        const url = `/exams`;
        return axiosClient.post(url, body);
    },
    submitExam: (id, body) => {
        let token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        const url = `/exams/${id}/done`;
        return axiosClient.post(url, body, { headers });
    },
    deleteExam: (id) => {
        const url = `/exams/${id}`;
        return axiosClient.delete(url);
    },
    addQuestion: (examId, questionId) => {
        const url = `/exams/${examId}/questions/${questionId}`;
        return axiosClient.put(url);
    },
    deleteQuestion: (examId, questionId) => {
        const url = `/exams/${examId}/questions/${questionId}`;
        return axiosClient.delete(url);
    },
    updateExam: (id, body) => {
        const url = `/exams/${id}`;
        return axiosClient.put(url, body);
    }
}
export default examApi;