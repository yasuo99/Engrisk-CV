import axiosClientv2 from "../../config/axiosClientv2";

const routeApi = {
    adminGetAll: async (params) => {
        const url = `/routes`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers, params })
    },
    getAllEngriskRoute: async (id) => {
        const url = `/routes/users/${id}`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
        return await axiosClientv2.get(url, { headers })
    },
    getNearestFinishRoute: async (id) => {
        const url = `/routes/users/${id}/nearest-finish`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    getAnonymousRoute: async () => {
        const url = `/routes/anonymous`;
        return await axiosClientv2.get(url)
    },
    userGetAll: async (id, pagination, isPrivate, status) => {
        const url = `/routes/users/${id}/manage`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        const params = {
            currentPage: pagination.currentPage,
            pageSize: pagination.pageSize,
            isPrivate: isPrivate,
            status: status
        }
        return axiosClientv2.get(url, { headers, params });
    },
    shareRoute: async (id) => {
        const url = `/routes/users/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return axiosClientv2.get(url, { headers });
    },
    getRouteSections: async (id) => {
        const url = `/routes/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    createRoute: async (body) => {
        const url = `/routes`;
        return await axiosClientv2.post(url, body);
    },
    updateRoute: async (id, body) => {
        const url = `/routes/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, body, { headers })
    },
    deleteRoute: async (id) => {
        const url = `/routes/${id}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.delete(url, { headers })
    },
    changeRouteStatus: async (id, accountId) => {
        const url = `/routes/${id}/users/${accountId}/status`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, { headers });
    },
    publishRoute: async (id, status) => {
        const url = `/routes/${id}/publish/change`;
        const params = {
            status: status
        }
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, null, { params, headers });
    },
    editSectionsRoute: async (id, sections) => {
        const url = `/routes/${id}/sections`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, sections, { headers });
    },
    routeLearn: async (routeId, sectionId, scriptId) => {
        const url = `/routes/${routeId}/sections/${sectionId}/scripts/${scriptId}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers });
    },
    requestCertificate: async (routeId) => {
        const url = `/routes/${routeId}/certificate/check`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers });
    },
    submitCertificateRequest: async (routeId, params) => {
        const url = `/routes/${routeId}/certificate/claim`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, {params, headers });
    }

}
export default routeApi;