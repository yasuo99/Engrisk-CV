import axiosClient from "../../utils/axiosClient";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const MessageActionsTypes = {
    GET_ALL: "GET_ALL",
    NEW: "NEW"
}
Object.keys(MessageActionsTypes).forEach((key) => {
    MessageActionsTypes[key] = `MESSAGE_${MessageActionsTypes[key]}`
});
const getAll 