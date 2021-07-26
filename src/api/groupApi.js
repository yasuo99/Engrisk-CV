import axiosClient from "../config/axiosClient";

const groupApi = {
    getAll:(params) => {
        const url = `/groups`;
        return axiosClient.get(url,{params});
    },
    getGroupsOfAccount: (accountId) => {
        const url = `/groups/accounts/${accountId}`;
        return axiosClient.get(url);
    },
    getDetail: (id) => {
        const url = `/groups/${id}`;
        return axiosClient.get(url);
    },
    createGroup: (body) => {
        const token = localStorage.getItem('token');
        const headers = {
            authorization: 'Bearer '+token
        }
        const url = `/groups`;
        return axiosClient.post(url,body, {headers});
    },
    addWordToGroup: (groupId,wordId) => {
        const url = `/groups/${groupId}/words/${wordId}`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer "+token
        }
        return axiosClient.put(url,null,{headers})
    }
    ,
    updateGroup: (id, body) => {
        const url = `/groups/${id}`;
        return axiosClient.put(url,body);
    },
    deleteGroup: (id) => {
        const token = localStorage.getItem('token');
        const headers = {
            authorization: 'Bearer ' + token
        }
        const url =  `/groups/${id}`;
        return axiosClient.delete(url,{headers});
    }

};
export default groupApi;