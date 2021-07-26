import { RouteActionTypes } from "../actions/routes"

const initial = {
    engrisk: [],
    private: [],
    lastRoute: {
        sections: [],
    }
}
const route = (state = initial, action) => {
    switch(action.type){
        case RouteActionTypes.SAVE:
            return{
                ...state,
                engrisk: action.engrisk,
                private: action.private,
                lastRoute: action.lastRoute || action.engrisk[0]
            }
        case RouteActionTypes.LEARN:
            return{
                ...state,
                lastRoute: action.route
            }
        default:
            return {
                ...state
            }
    }
}
export default route