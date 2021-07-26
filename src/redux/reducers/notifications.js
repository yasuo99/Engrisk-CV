import { NotificationActionsTypes } from "../actions/notifications";

const INITIAL_STATE = {
    notifications: [],
    unseen: []
};
const notification = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case NotificationActionsTypes.GET_ALL:
            return{
                ...state,
                notifications: action.notifications.items
            }
        case NotificationActionsTypes.NEW:
            return{
                ...state,
                notifications: [action.notification, ...state.notifications],
                unseen: [action.notification, ...state.unseen]
            }
        default:
            return state;
    }
}
export default notification