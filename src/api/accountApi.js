import axiosClient from "../config/axiosClient";

const accountApi = {
    getAll: async () => {
        const url = "/accounts";
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        return await axiosClient.get(url, { headers });
    },
    getDetail: async (id) => {
        const url = `/accounts/detail/${id}`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        return await await axiosClient.get(url, { headers });
    },
    getExamProgress: async (id) => {
        const url = `/accounts/${id}/exam-progress`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: 'Bearer ' + token
        };
        return await axiosClient.get(url,{headers});
    },
    getQuizProgress: async (id) => {
        const url = `/accounts/${id}/quiz-progress`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: 'Bearer ' + token
        };
        return await axiosClient.get(url,{headers});
    },
    getWordProgress: async (id) => {
        const url = `/accounts/${id}/word-progress`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: 'Bearer ' + token
        };
        return await axiosClient.get(url,{headers});
    },
    quizProgress: async (id) => {
        const url = `/accounts/${id}/quiz-progress`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: 'Bearer ' + token
        };
        return await axiosClient.get(url,{headers});
    },
    updateAccount: async (id, body) => {
        const url = `/accounts/${id}`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        return await axiosClient.put(url, body, { headers });
    },
    banAccount: async (id, body) => {
        const url = `/accounts/${id}/ban`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        const params = {
            hour: body
        }
        return await axiosClient.put(url, null, { params, headers });
    },
    disableAccount: async (id) => {
        const url = `/accounts/${id}/disable`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        }
        return await axiosClient.put(url, null, {headers });
    },
    forgetPassword: async (email) => {
        const url =`/accounts/forget-pw?email=${email}`;
        return await axiosClient.get(url);
    },
    resetPassword: async (otp,email, newPassword, confirmPassword) => {
        const url = `/accounts/reset-pw`;
        const body = {
            otp: otp,
            email: email,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };
        return await axiosClient.post(url,body);
    },
    changePassword: async (accountId,currentPassword,newPassword) => {
        const url = `/accounts/${accountId}/changepw`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        };
        const body = {
            currentPassword: currentPassword,
            newPassword: newPassword
        };
        return await axiosClient.put(url, body,{headers});
    },
    addAccountToRole: async (accountId, roleName) => {
        const url = `/accounts/${accountId}/roles`;
        const token = localStorage.getItem('token');
        const headers = {
            authorization: "Bearer " + token
        };
        const body = {
            roleName: roleName
        }
        return await axiosClient.put(url,body, {headers});
    },
    sendEmailActive: async (email) => {
        const url = `/account/verify-email`;
        const params = {
            email: email
        };
        return await axiosClient.get(url,{params});
    },
    activeEmail: async (otp, email) => {
        const url = `/account/active-email`;
        const params = {
            email: email,
            otp: otp
        }
        return await axiosClient.post(url, {params});
    },
    register: async (body) => {
        const url = `/accounts/register`;
        return await axiosClient.post(url,body);
    }
}
export default accountApi;