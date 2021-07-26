const initialState = {
    notifications : []
}
const notificationReducer = (state = initialState, action) => {
    switch (action) {
        case action.NewNotification:
            return{
                ...initialState,
                notifications: [notifications, action.notification]
            }
    
        default:
            break;
    }
}