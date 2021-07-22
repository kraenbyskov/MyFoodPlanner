import { GET_ALL_RECIPES, GET_CUSTOM_LIST } from "../constants";

const initialState = {
  AllRecipes: null,
  CustomRecipesList: [],
};

export const getRecipes = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        AllRecipes: action.AllRecipes,
      };
    case GET_CUSTOM_LIST:
      return {
        ...state,
        CustomRecipesList: action.CustomRecipesList,
      };

    default:
      return state;
  }
};
