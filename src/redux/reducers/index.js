import { combineReducers } from "redux";
import chatReduce from "./chatReduce";
import user from './user_reducer'
const rootReducer = combineReducers({
  chatReduce,
  user
})

export default rootReducer