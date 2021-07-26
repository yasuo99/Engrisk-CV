import { toast } from "react-toastify"
const initialState = {
    result: {}
};
const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SUBMIT_EXAM":
            return {
                ...state,
                result:action.result
            }
        case "REMOVE_RESULT":
            return{
                ...state,
                result: {}
            }
        default:
            return state;
    }
}
export default examReducer;