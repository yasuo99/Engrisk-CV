import axiosClientV1 from "../../utils/axiosClientV1"

export const WordsActionsTypes = {
    GET_ALL: 'GET_ALL',
}
Object.keys(WordsActionsTypes).forEach((key) => {
    WordsActionsTypes[key] = `WORD_${WordsActionsTypes[key]}`
})
const getAll = async () => {
    const url = `/words`
    const headers = {
        Authorization: `Bearer {token}`
    }
    const data = await axiosClientV1.get(url);
    return{
        type: WordsActionsTypes.GET_ALL,
        data: data
    }
}

const WordsActions = {
    getAll: getAll,
}
export default WordsActions