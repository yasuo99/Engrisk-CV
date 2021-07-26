import axiosClientv2 from "../../config/axiosClientv2";

const groupApiv2 = {
    wordGroupAction: async (accountId, groupId, wordId) => {
        const url = `/accounts/${accountId}/groups/${groupId}/words/${wordId}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url, null, {headers});
    }
}
export default groupApiv2;