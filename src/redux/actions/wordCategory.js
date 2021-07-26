import axiosClient from "../../utils/axiosClient"
import AsyncStorage from '@react-native-async-storage/async-storage';
export const WordCategoriesActionsTypes = {
    GET_ALL: 'GET_ALL',
    GET_DETAIL: 'GET_DETAIL',
    GET_ALL2: 'GET_ALL2',
}
Object.keys(WordCategoriesActionsTypes).forEach((key) => {
    WordCategoriesActionsTypes[key] = `WORDCATEGORY_${WordCategoriesActionsTypes[key]}`
})
// const test = []
const getAll = async (currentPage) => {
    const url = `/wordCategories`
    const headers = {
        Authorization: `Bearer {token}`
    }
    const data = await axiosClient.get(url,{ params: { tag: "all", currentPage:currentPage} });
    console.log(data)
    await AsyncStorage.setItem('wordCategories',JSON.stringify(data.items));
    return{
        type: WordCategoriesActionsTypes.GET_ALL,
        data: data,
    }
}
const getAll2 = async () => {
    // const url = `/wordCategories`
    // const headers = {
    //     Authorization: `Bearer {token}`
    // }
    // const data1 = await axiosClient.get(url);
    const data = await AsyncStorage.setItem(`/wordCategories`,data);
    return{
        type: WordCategoriesActionsTypes.GET_ALL2,
        data: data
    }
}
const getDetail = async (WordCategoryId) => {
    const url = `/wordCategories/${WordCategoryId}`
    const headers = {
        Authorization: `Bearer {token}`
    }
    const data = await axiosClient.get(url)
    return {
        type: WordCategoriesActionsTypes.GET_ALL,
        data: data
    }
}

const WordCategoriesActions = {
    getAll: getAll,
    getDetail: getDetail,
    getAll2: getAll2,
}
export default WordCategoriesActions