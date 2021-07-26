import axiosClientv2 from "../../config/axiosClientv2";

const certificateApi = {
    getAll: async (params) => {
        const url = `/certificate`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { params, headers })
    },
    getManage: async (params) => {
        const url = `/certificate/manage`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { params, headers })
    },
    create: async (body) => {
        const url = `/certificate`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.post(url, body, { headers })
    },
    update: async (id, body) => {
        const url = `/certificate/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, body, { headers })
    },
    delete: async (id) => {
        const url = `/certificate/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.delete(url, { headers })
    }
}
export default certificateApi