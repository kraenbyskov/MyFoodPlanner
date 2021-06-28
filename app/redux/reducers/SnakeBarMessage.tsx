import { DELETE_RECIPE, ADD_TO_CUSTOM_LIST, EDIT_RECIPE } from '../constants';

const initialState = {
	Message: null
};

export const Message = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_RECIPE:
			return {
				...state,
				ActionMessage: action.Message
			};
		case ADD_TO_CUSTOM_LIST:
			return {
				...state,
				ActionMessage: action.Message
			};
		case EDIT_RECIPE:
			return {
				...state,
				ActionMessage: action.Message
			};

		default:
			return state;
	}
};
