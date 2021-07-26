import axiosClient from "../config/axiosClient";

const sectionApi = {
    getAll: (params, auth) => {
        const url = "/sections";
        let header = ''
        if (auth) {
            const token = localStorage.getItem('token');
            header = {
                "Authorization": "Bearer " + token
            }
        }
        console.log(params);
        return axiosClient.get(url, { params, headers: header });
    },getManage: (params, auth) => {
        const url = "/sections/manage";
        let header = ''
        if (auth) {
            const token = localStorage.getItem('token');
            header = {
                "Authorization": "Bearer " + token
            }
        }
        return axiosClient.get(url, { params, headers: header });
    },
    doQuiz: (id, params) => {
        let token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        const url = `/sections/${id}/do`;
        return axiosClient.get(url, { params, headers });
    },
    doneQuiz: (sectionId, quizId) => {
        const url = `/sections/${sectionId}/quizzes/${quizId}/done`;
        const token = localStorage.getItem('token');
        const start = localStorage.getItem('start');
        const headers = {
            "Authorization": "Bearer " + token
        }
        console.log(headers);
        return axiosClient.post(url,start,{headers});
    },
    getDetail: (id) => {
        const url = `/sections/${id}`;
        return axiosClient.get(url);
    },
    getAllQuizzes: (id) => {
        const url = `/sections/${id}/quizzes`;
        return axiosClient.get(url);
    },
    create: (body) => {
        const url = `/sections`;
        return axiosClient.post(url,body);
    },
    update: (id, body) => {
        const url = `/sections/${id}`;
        return axiosClient.put(url, body);
    },
    setRequireLogin: (id) => {
        const url = `/sections/${id}/require-login`;
        return axiosClient.put(url);
    },
    delete: (id) => {
        const url = `/sections/${id}`;
        return axiosClient.delete(url);
    }
}
export default sectionApi;