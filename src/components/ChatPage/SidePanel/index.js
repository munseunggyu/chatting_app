import ChatRooms from "./ChatRooms"
import DirectMessage from "./DirectMessage"
import Favorited from "./Favorited"
import UserPanel from "./UserPanel"

function SidePanel(){
  return(
    <div className="side-panel">
      SidePanel
      <UserPanel />
      <Favorited />
      <ChatRooms />
      <DirectMessage />
    </div>
  )
}

export default SidePanel