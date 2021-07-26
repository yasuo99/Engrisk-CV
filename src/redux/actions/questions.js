import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../../utils/axiosClient";

export const QuestionActionTypes = {
    CHECK: 'CHECK',
}
Object.keys(QuestionActionTypes).forEach((key) => {
    QuestionActionTypes[key] = `QUESTION_${QuestionActionTypes[key]}`
})
const checkAnswer = async (id, answer) => {
    const url = `/questions/${id}/check`;
    const params = {
        answer: answer
    }
    const headers ={
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
    }
    const result = await axiosClient.get(url,{params, headers})
    return {
        type: QuestionActionTypes.CHECK,
        result: result
    }
}
const QuestionActions = {
    checkAnswer: checkAnswer
}
export default QuestionActions;