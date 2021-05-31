import { combineReducers } from 'redux';
import { user } from './user';
import { getRecipes } from './getRecipes';

const Reducers = combineReducers({
	userState: user,
	recepiesState: getRecipes
});

export default Reducers;
