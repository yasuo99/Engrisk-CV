import axiosClient from "../config/axiosClient"

const notificationApi = {
    getAll: () => {
        const url = "/notifications";
        return axiosClient.get(url);
    },
    getDetail: (id) => {
        const url = `/notifications/${id}`;
        return axiosClient.get(url);
    },
    publishNotification :(id) => {
        const url = `/notifications/publish/${id}`;
        return axiosClient.put(url);
    },
    getPublishing: (params,client) => {
        const url = `/notifications/client/publishing`;
        return axiosClient.get(url,{params});
    },
    getAdminNotification: (params) => {
        const url = `/notifications/admin/publishing`;
        return axiosClient.get(url,{params});
    }
    ,
    createNotification: (body) => {
        const url = `/notifications`;
        return axiosClient.post(url,body);
    },
    updateNotify: (id,body) => {
        const url = `/notifications/${id}`;
        return axiosClient.put(url,body);
    },
    deleteNotify:(id) => {
        const url = `/notifications/${id}`;
        return axiosClient.delete(url);
    }
}

export default notificationApi
