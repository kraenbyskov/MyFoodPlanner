import { GET_ALL_RECIPES } from "../constants";

const initialState = {
  AllRecipes: null,
};

export const getRecipes = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        AllRecipes: action.AllRecipes,
      };

    default:
      return state;
  }
};
