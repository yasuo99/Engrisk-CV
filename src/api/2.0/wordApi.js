import axiosClientv2 from "../../config/axiosClientv2";

const wordApiV2 = {
    getAll: async (params) => {
        const url = "/words";
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { params, headers }).catch(err => {
            console.log(err);
        })
    },
    createWord: async (body) => {
        const url = `/words`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.post(url, body, { headers })
    },
    createMem: async (id, body) => {
        const url = `/words/${id}/memories`;
        const headers = {
            Authorization: `bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.post(url, body, { headers }).catch(err => {
            console.log(err);
        })
    },
    updateWord: async (id, body) => {
        const url = `/words/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.put(url, body, { headers })
    },
    deleteWord: async (id) => {
        const url = `/words/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.delete(url, { headers })
    }
    ,
    selectMemory: async (id, memId) => {
        const url = `/words/${id}/memories/${memId}`;
        const headers = {
            Authorization: `bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.put(url, null, { headers }).catch(err => {
            console.log(err);
        })
    },
    vocabularyReview: async (words) => {
        const url = `/words/review`;
        const headers = {
            Authorization: `bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.post(url, words, { headers });
    },
    getAllPracticeQuestion: async (id) => {
        const url = `/words/${id}/questions`;
        const headers = {
            Authorization: `bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers });
    },
    getVocabularyForScript: async (query) => {
        const url = `/words/inserted`
        const headers = {
            Authorization: `bearer ${localStorage.getItem('token')}`
        }
        const params = {
            search: query
        }
        return await axiosClientv2.get(url, { params, headers });
    },
    changeStatus: async (id, status) => {
        const url = `/words/${id}/publish/change`;
        const headers = {
            Authorization: `bearer ${localStorage.getItem('token')}`
        }
        const params = {
            status: status
        }
        return await axiosClientv2.put(url, null, { params, headers });
    }
}
export default wordApiV2;