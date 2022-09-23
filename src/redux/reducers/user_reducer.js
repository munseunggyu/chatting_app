import { SET_USER } from "../actions/types"

const initialUserState = {
  currentUser: null,
  isLoding: true
}
export default function(state={},action){
  switch(action.type){
    case SET_USER:
      return {...state,currentUser: action.payload,isLoding:false}
    default:
      return state
  }
}