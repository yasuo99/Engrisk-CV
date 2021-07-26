const initial = {
    progress: {
    }
}
const sectionReducer = (state = initial, action) => {
    switch(action.type){
        case "SECTION_FINISH_UP":
            return {
                ...state,
                progress: action.progress
            }
        default:
            return state;
    }
}
export default sectionReducer;