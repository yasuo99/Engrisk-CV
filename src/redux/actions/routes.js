import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../../utils/axiosClient";

export const RouteActionTypes = {
    GET_ALL: 'GET_ALL',
    SAVE: 'SAVE',
    GET_DETAIL: 'GET_DETAIL',
    LEARN: 'LEARN'
}
Object.keys(RouteActionTypes).forEach((key) => {
    RouteActionTypes[key] = `ROUTE_${RouteActionTypes[key]}`
})
const getAll = async (id) => {
    const url = `/routes/users/${id}`;
    const headers = {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
    }
    const data = await axiosClient.get(url,{headers})
    await AsyncStorage.setItem('routes',JSON.stringify(data));
    return({
        type: RouteActionTypes.GET_ALL,
        routes: data
    })
}
const saveAll = (routes) => {
    return ({
        type: RouteActionTypes.SAVE,
        engrisk: routes.engrisk,
        private: routes.private,
        lastRoute: routes.lastRoute
    })
}
const select = (route) => {
    return({
        type: RouteActionTypes.LEARN,
        route: route
    })
}
const RouteActions = {
    getAll: getAll,
    select: select,
    saveAll: saveAll
}
export default RouteActions;