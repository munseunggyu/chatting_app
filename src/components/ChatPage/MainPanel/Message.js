import { Col, Container, Row } from "react-bootstrap"


function Message({messageData}){
  
  return(
    <div style={{ marginBottom: '3px', display:'flex' }}>
    <img
        style={{ borderRadius: '10px' }}
        width={48}
        height={48}
        className="mr-3"
        src={messageData.CreateUer.photoURL}
        alt={messageData.CreateUer.name}
    />
    <div style={{
        backgroundColor: 
        // isMessageMine(message, user) && 
        "#ECECEC"
    }}>
        <h6>{messageData.CreateUer.name}
            <span style={{ fontSize: '10px', color: 'gray' }}>
              
            </span>
        </h6>
            <p>
            {messageData.content}
            </p>
    </div>
</div>
  )
}

export default Message