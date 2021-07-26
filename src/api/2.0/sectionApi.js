import axiosClientv2 from "../../config/axiosClientv2";

const sectionApiV2 = {
    getAll: async (params) => {
        const url = `/sections`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers, params })
    },
    getManage: async (params) => {
        const url = `/sections/manage`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers, params })
    }
    ,
    start: async (id) => {
        const url = `/sections/${id}/vocabulary`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    getSectionProgressReview: async (id) => {
        const url = `/sections/${id}/finish-up`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    getFreeSections: async () => {
        const url = '/sections/free';
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    preview: async (id) => {
        const url = `/sections/${id}/preview`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    delete: async (id) => {
        const url = `/sections/${id}`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.delete(url, { headers })
    },
    getScriptEdit: async (id) => {
        const url = `/sections/${id}/scripts/edit`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    editScripts: async (id, scripts) => {
        const url = `/sections/${id}/scripts`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, scripts, { headers })
    },
    publishChange: async (id, status) => {
        const url = `/sections/${id}/publish/change`;
        const params = {
            status: status
        }
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, null, { params, headers })
    }
}
export default sectionApiV2;