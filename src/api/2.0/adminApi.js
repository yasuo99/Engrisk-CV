import axiosClientv2 from "../../config/axiosClientv2";

const adminApi = {
    getWaitingCensorQuizzes: async (params) => {
        const url = `/admin/censor?type=Quiz`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { headers, params })
    },
    getWaitingCensorExams: async (params) => {
        const url = `/admin/censor?type=Exam`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { headers, params })
    },
    getWaitingCensorRoutes: async (params) => {
        const url = `/admin/censor?type=Route`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { headers, params })
    },
    getWaitingCensorPosts: async (params) => {
        const url = `/admin/censor?type=Post`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { headers, params })
    },
    getWaitingCensorComments: async (params) => {
        const url = `/admin/censor?type=Comment`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { headers, params })
    },
    getWaitingCensorExamples: async (params) => {
        const url = `/admin/censor?type=Example`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { headers, params })
    },
    getWaitingCensorMemories: async (params) => {
        const url = `/admin/censor?type=Memory`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { headers, params })
    },
    submitCensored: async (id, type, status, difficultLevel) => {
        const url = `/admin/censor/${id}?type=${type}&status=${status}&difficultLevel=${difficultLevel}`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.put(url, null, { headers });
    },
    getDashboard: async () => {
        const url = `/admin/dashboard`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { headers });
    }
}
export default adminApi;