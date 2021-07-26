import axiosClient from "../../utils/axiosClient";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const NotificationActionsTypes = {
    GET_ALL: "GET_ALL",
    NEW: "NEW"
}
Object.keys(NotificationActionsTypes).forEach((key) => {
    NotificationActionsTypes[key] = `NOTIFICATION_${NotificationActionsTypes[key]}`
});
//Biến id hiện sẽ được set cứng tuy nhiên sau đó sẽ chuyển qua lấy từ AsyncStorage
const getAll = async (id) => {
    const url = `/notification/${id}`
    const params = {
        pageSize: 50,
    }
    const data = await axiosClient.get(url,{params})
    await AsyncStorage.setItem('notification', JSON.stringify(data.items))
    return {
        type: NotificationActionsTypes.GET_ALL,
        notifications: data
    }
}
const newNotify = (notification) => {
    return {
        type: NotificationActionsTypes.NEW,
        notification: notification
    }
}
const NotificationActions = {
    getData: getAll,
    newNotify: newNotify
}
export default NotificationActions
