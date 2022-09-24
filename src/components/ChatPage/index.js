import MainPanel from "./MainPanel"
import SidePanel from "./SidePanel"

function ChatPage(){
  return(
    <div className="chat-page">
      <SidePanel />
      <MainPanel />
    </div>
  )
}

export  default ChatPage