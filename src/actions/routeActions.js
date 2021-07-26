export const getAll = (typeRoute) => {
    return dispatch => {
        return dispatch({ type: "GET_ALL_ROUTE", typeRoute: typeRoute })
    }
}
export const selectRoute = (route) => {
    return dispatch => {
        return dispatch({ type: "SELECT_ROUTE", route: route })
    }
}
export const toggle = (status) => {
    return dispatch => {
        return dispatch({ type: `${status ? 'EXPAND' : 'COLLAPSE'}` });
    }
}