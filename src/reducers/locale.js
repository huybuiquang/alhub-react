import { LOCALE_SET } from "../types";

export default (state = {lang:"en"}, action) => {
    switch (action.type) {
        case LOCALE_SET:
            return {...state, lang : action.lang}
        default:
            return state;
    }
};