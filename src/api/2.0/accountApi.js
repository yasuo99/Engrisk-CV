import axiosClientv2 from "../../config/axiosClientv2";

const accountApiV2 = {
    followUser: async (followerId, followingId) => {
        const url = `/accounts/${followerId}/following/${followingId}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, null, { headers });
    },
    getVocabularyLearntResult: async (accountId) => {
        const url = `/accounts/${accountId}/vocabulary/learned`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers });
    },
    getVocabularyReviewQuestions: async (accountId, words) => {
        const url = `/accounts/${accountId}/vocabulary/review`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return await axiosClientv2.get(url, { headers })
    },
    getUserSharingQuizDetail: async (id, quizId) => {
        const url = `/accounts/${id}/resources/quizzes/${quizId}/sharing`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers });
    },
    shareQuiz: async (id, quizId, users) => {
        const url = `/accounts/${id}/resources/quizzes/${quizId}/sharing`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, users, { headers });
    },
    getUserSharingExamDetail: async (id, examId) => {
        const url = `/accounts/${id}/resources/exams/${examId}/sharing`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers });
    },
    shareExam: async (id, examId, users) => {
        const url = `/accounts/${id}/resources/exams/${examId}/sharing`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, users, { headers });
    },
    deleteQuiz: async (id, quizId) => {
        const url = `/accounts/${id}/resources/quizzes/${quizId}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.delete(url, { headers });
    },
    deleteExam: async (id, examId) => {
        const url = `/accounts/${id}/resources/exams/${examId}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.delete(url, { headers });
    },
    getUserBoxchats: async (id) => {
        const url = `/accounts/${id}/boxchats`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers });
    },
    getBoxchatDetail: async (id, boxchatId) => {
        const url = `/accounts/${id}/boxchats/${boxchatId}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers });
    },
    inviteUsersToBoxchat: async (id, boxchatId, users) => {
        const url = `/accounts/${id}/boxchats/${boxchatId}/members`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, users, { headers });
    },
    reponseInviteBoxchatRequest: async (id, notificationId, action) => {
        const url = `/accounts/${id}/notifications/${notificationId}/invite?action=${action}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, null, { headers })
    },
    vocabularyReview: async (id, type) => {
        const url = `/accounts/${id}/vocabulary/review?option=${type}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    getUserQuizShared: async (id) => {
        const url = `/accounts/${id}/resources/shared/quizzes`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    }, getUserExamShared: async (id) => {
        const url = `/accounts/${id}/resources/shared/exams`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url, { headers })
    },
    getLearningHistory: async (id, params) => {
        const url = `/accounts/${id}/learning/history`
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url,{params})
    },
    getUserCertificates: async (id,params) => {
        const url = `/accounts/${id}/certificates`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.get(url,{params,headers});
    },
    getUserQuestions: async (id, params, grammar, query) => {
        const url = `/accounts/${id}/questions`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        if(query){
            params.search = query;
        }
        if(grammar){
            params.grammar = grammar
        }
        return await axiosClientv2.get(url,{params,headers});
    },
    selectRoute: async (id, routeId) => {
        const url = `/accounts/${id}/routes/${routeId}/select`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url,null, {headers});
    }
}
export default accountApiV2;