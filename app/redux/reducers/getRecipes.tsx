import { GET_RECEPIES } from '../constants';

const initialState = {
	recepiesState: null
};

export const getRecipes = (state = initialState, action) => {
	switch (action.type) {
		case GET_RECEPIES:
			return {
				...state,
				recepiesState: action.currentUser
			};

		default:
			return state;
	}
};
