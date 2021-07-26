import axiosClientv2 from "../../config/axiosClientv2";

const examApiv2 = {
    getAll: async (params) => {
        const url = `/exams`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, {params, headers });
    },
    getManage: async (params) => {
        const url = `/exams/all`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, {params, headers });
    },
    get: async (id) => {
        const url = `/exams/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers });
    },
    create: async (body, side) => {
        const url = side ? "/exams" : `/exams/user/${JSON.parse(localStorage.getItem('account')).id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.post(url, body, { headers });
    },
    edit: async (id,body) => {
        const url = `/exams/${id}`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url,body, { headers });
    },

    doExam: async (id) => {
        const url = `/exams/${id}/do`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers });
    },
    pauseExam: async (id, currentQuestion) => {
        const url = `/exams/${id}/pause`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        const params = {
            currentQuestion: currentQuestion
        }
        return await axiosClientv2.put(url, null, { params, headers });
    },
    resumeExam: async (id) => {
        const url = `/exams/${id}/resume`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, null, { headers });
    },
    doneExam: async (id, body) => {
        const url = `/exams/${id}/done`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.post(url, body, { headers });
    },
    getUserExams: async (id, params) => {
        const url = `/exams/user/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, {params, headers });
    }
}
export default examApiv2;