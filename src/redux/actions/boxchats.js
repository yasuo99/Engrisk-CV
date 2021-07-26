import axiosClient from "../../utils/axiosClient"
import AsyncStorage from '@react-native-async-storage/async-storage';
export const BoxChatActionsTypes = {
    GET_ALL: 'GET_ALL',
    GET_DETAIL: 'GET_DETAIL',
    NEW_MESSAGE: 'NEW_MESSAGE'
}
Object.keys(BoxChatActionsTypes).forEach((key) => {
    BoxChatActionsTypes[key] = `BOXCHAT_${BoxChatActionsTypes[key]}`
})
//Biến id tạm thời set cứng, sau đó cũng sử dụng AsyncStorage
//Token cũng đc lấy từ AsyncStorage
const getAll = async (id) => {
    const url = `/accounts/${id}/boxchats`
    const headers = {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
    }
    const data = await axiosClient.get(url, {headers});
    await AsyncStorage.setItem('boxchats',JSON.stringify(data));
    return {
        type: BoxChatActionsTypes.GET_ALL,
        data: data
    }
}
//userId là id của người dùng lấy từ AsyncStorage
//boxchatId là từ params
const getDetail = async (userId, boxchatId) => {
    const url = `/accounts/${userId}/boxchats/${boxchatId}`
    const headers = {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
    }
    const data = await axiosClient.get(url, {headers})
    return {
        type: BoxChatActionsTypes.GET_DETAIL,
        data: data
    }
}
const newMessage = (message) => {
    return {
        type: BoxChatActionsTypes.NEW_MESSAGE,
        data: message
    }
}
const BoxChatActions = {
    getAll: getAll,
    getDetail: getDetail,
    newMessage: newMessage
}
export default BoxChatActions