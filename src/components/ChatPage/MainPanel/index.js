import Message from "./Message"
import MessageForm from "./MessageForm"
import MessageHeader from "./MessageHeader"

function MainPanel(){
  return(
    <div className="main-panel">
    MainPanel
    <MessageHeader />
    <MessageForm />
    <Message />
    </div>
  )
}

export default MainPanel