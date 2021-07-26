import { combineReducers } from "redux";
import authReducer from "./authReducer";
import examReducer from "./examReducer";
import postReducer from "./postReducer";
import routeReducer from "./routeReducer";
import sectionReducer from "./sectionReducer";
import sidenavReducer from "./sidenavReducer";
import wordReducer from "./wordReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    word: wordReducer,
    exam: examReducer,
    sidenav: sidenavReducer,
    post: postReducer,
    section: sectionReducer,
    route: routeReducer
});

export default rootReducer;
