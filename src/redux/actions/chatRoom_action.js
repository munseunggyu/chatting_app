import { SET_CURRENT_CHAT_ROOM } from "./types";

export function setCurrentChatRoom(list){
  return {
    type:SET_CURRENT_CHAT_ROOM,
    payload:list
  }
}