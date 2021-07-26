import axiosClientv2 from "../../config/axiosClientv2"

const questionApiV2 = {
    checkAnswer: async (id, answer) => {
        const url = `/questions/${id}/check?answer=${answer}`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    getAll: async (params) => {
        const url = `/questions`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { params, headers })
    },
    getFilter: async (filter, grammar) => {
        const url = `/questions/all`
        const params = {
            type: filter,
        }
        if (grammar) {
            params.grammar = grammar
        }
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { params, headers })
        console.log(params);
    },
    getFilterTwo: async (params) => {
        const url = `/questions/all`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { params, headers })
    }
    ,
    getManage: async (params, grammar, search) => {
        const url = `/questions/manage`;
        if (search) {
            params.search = search;
        }
        if (grammar) {
            params.grammar = grammar
        }
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { params, headers })
    },
    getAnalystic: async () => {
        const url = `/questions/statistical`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { headers })
    },
    createQuestion: async (body) => {
        const url = `/questions`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.post(url, body, { headers })
    },
    deleteQuestion: async (id) => {
        const url = `/questions/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.delete(url, { headers })
    }
}
export default questionApiV2