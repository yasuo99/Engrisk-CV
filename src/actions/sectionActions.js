export const FinishUp = (progress) => {
    return dispatch => {
        return (dispatch({type: 'SECTION_FINISH_UP', progress: progress}))
    }
}