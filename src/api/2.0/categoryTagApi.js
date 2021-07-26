import axiosClientv2 from "../../config/axiosClientv2";

const categoryTagApi = {
    getAll: async (params) => {
        const url = `/categorytag`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { params, headers });
    },
    getAllWithoutPaginate: async () => {
        const url = `/categorytag/all`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers });
    },
    create: async (body) => {
        const url = `/categorytag`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.post(url, body, { headers });
    },
    update: async (id, body) => {
        const url = `/categorytag/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, body, { headers });
    },
    delete: async (id) => {
        const url = `/categorytag/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.delete(url, { headers });
    }
}
export default categoryTagApi