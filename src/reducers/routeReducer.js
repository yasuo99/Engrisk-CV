const initial = {
    route: {
        sections: []
    },
    typeRoute: {
        engrisk: [],
        public: [],
        private: []
    },
    collapse: true
}
const routeReducer = (state = initial, action) => {
    switch (action.type) {
        case "SELECT_ROUTE":
            return {
                ...state,
                route: action.route
            }
        case "GET_ALL_ROUTE":
            return {
                ...state,
                typeRoute: action.typeRoute
            }
        case "COLLAPSE":
            return{
                ...state,
                collapse: true
            };
        case "EXPAND":
            return{
                ...state,
                collapse: false
            }
        default:
            return {
                ...state
            }
    }
}
export default routeReducer