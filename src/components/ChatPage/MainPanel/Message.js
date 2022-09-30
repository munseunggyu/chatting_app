import { Col, Container, Row } from "react-bootstrap"


function Message({messageData}){
  const getDate = () => {
    const date = messageData.CreateAt.toDate()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const min = date.getMinutes()
    // const seconds = date.getSeconds()
    return `${year}-${month}-${day} ${hour}:${min}`
  }
  const time = getDate()
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
            <span style={{ fontSize: '10px', color: 'gray' ,marginLeft:'5px'}}>
             {time}
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