import { combineReducers } from "redux"
import { user } from "./user"
import { getRecipes } from "./getRecipes"
import { Message } from "./SnakeBarMessage"

const Reducers = combineReducers({
    userState: user,
    recepiesState: getRecipes,
    Message: Message,
})

export default Reducers
