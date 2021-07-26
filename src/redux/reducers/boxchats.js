import { BoxChatActionsTypes } from "../actions/boxchats"

const init = {
    current: {
        messages: []
    },
    boxchats: []
}
const boxchat = (state = init, action) => {
    console.log('boxchat', action);
    switch (action.type) {
        case BoxChatActionsTypes.GET_ALL:
            return {
                ...state,
                boxchats: action.data
            };
        case BoxChatActionsTypes.GET_DETAIL:
            return {
                ...state,
                current: action.data
            }
        case BoxChatActionsTypes.NEW_MESSAGE:
            console.log(state.current.messages);
            if (state.current.id == action.data.boxchatId) {
                console.log('wtf');
                const newCurr = {
                    ...state.current,
                    messages: [...state.current.messages,action.data]
                }
                return {
                    ...state,
                    current: newCurr
                }
            }
            else {
                return {
                    ...state
                }
            }

        default:
            return state;
    }
}
export default boxchat