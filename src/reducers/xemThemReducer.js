
var initialState = [];

const xemThemReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_WORDS":
            state = action.words;
            return [...state];

        default: return [...state];
    }
};

export default xemThemReducer;
