const initialState = {
    collapse: true
}
const sidenavReducer = (state = initialState, action) => {
    switch(action.type){
        case "Collapse":
            return {...state,collapse: true}
        case "Expand":
            return {...state,collapse: false}
        default:
            return state;
    };
}
export default sidenavReducer;