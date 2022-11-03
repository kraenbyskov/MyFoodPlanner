import {
    DELETE_RECIPE,
    ADD_TO_CUSTOM_LIST,
    EDIT_RECIPE,
    ADD_RECIPE_MESSAGE,
    DELETE_CUSTOM_LIST_ITEM,
} from "../constants"

const initialState = {
    Message: null,
}

export const Message = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_RECIPE:
            return {
                ...state,
                ActionMessage: action.Message,
            }
        case ADD_TO_CUSTOM_LIST:
            return {
                ...state,
                ActionMessage: action.Message,
            }
        case EDIT_RECIPE:
            return {
                ...state,
                ActionMessage: action.Message,
            }
        case ADD_RECIPE_MESSAGE:
            return {
                ...state,
                ActionMessage: action.Message,
            }
        case DELETE_CUSTOM_LIST_ITEM:
            return {
                ...state,
                ActionMessage: action.Message,
            }

        default:
            return state
    }
}
