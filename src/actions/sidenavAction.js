export const toggleSidenav = (collapse) => {
    return dispatch => {
        return collapse ? dispatch({ type: "Expand" }) : dispatch({type: "Collapse"});
    }
}
