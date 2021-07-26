import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../../utils/axiosClient";

export const ScriptActionsType = {
    LEARN: 'LEARN'
}
Object.keys(ScriptActionsType).forEach((key) => {
    ScriptActionsType[key] = `SCRIPT_${ScriptActionsType[key]}`
})
const learn = async (routeId, sectionId, scriptId) => {
    const url = `/routes/${routeId}/sections/${sectionId}/scripts/${scriptId}`;
    const headers = {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
    }
    const data = await axiosClient.get(url,{headers})
    return({
        type: ScriptActionsType.LEARN,
        script: data
    })
}
const ScriptActions = {
    learn: learn
}
export default ScriptActions;