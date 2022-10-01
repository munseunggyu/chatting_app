import { SET_CURRENT_CHAT_ROOM, SET_PRIVATE_CHAT_ROOM } from "../actions/types"

const initialChatRoomState = {
  currentChatRoom: null,
  isPrivateChatRoom: false
}

const chatReduce = (state=initialChatRoomState,action) => {
  switch(action.type){
    case SET_CURRENT_CHAT_ROOM:
      return {
        ...state,
        currentChatRoom:action.payload,
        isPrivateChatRoom:false
      }
    case SET_PRIVATE_CHAT_ROOM:
      return{
        ...state,
        isPrivateChatRoom:true,
        currentChatRoom:action.payload
      }
    default:
      return state
  }
}

export default chatReduce