import { FaRegSmileWink,FaPlus } from 'react-icons/fa';

function ChatRooms(){
  return(
    <div>
      <div style={{position:'relative',with:'100%'
      ,display:'flex',alignItems:'center'}}>
       <FaRegSmileWink style={{ marginRight: 3 }} />
       CHAT ROOMS (1)
       <FaPlus
        // onClick={this.handleShow}
        style={{
            position: 'absolute',
            right: '-10px', cursor: 'pointer'
        }} />
      </div>
    </div>
  )
}

export default ChatRooms