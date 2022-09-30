import React, { useState, useRef, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { addDoc, collection, collectionGroup, orderBy, getDocs, query, setDoc, where , doc, serverTimestamp, onSnapshot} from 'firebase/firestore';
import { db } from '../../../firebase';
import { useSelector } from 'react-redux';
import Message from './Message';


function MessageForm() {
  const [content,setContent] = useState('')
  const handleTxtChange = (e) => setContent(e.target.value)
  const userInfo = useSelector(state => state.user.currentUser )
  const currentChatId = useSelector(state => state.chatReduce)
  const [messages,setMessages] = useState([])
  const handleClick = async () => {
    if(currentChatId.currentChatRoom === null){
      alert('방을 선택해 주세요')
      return
    }
    
    // 대화방의 메시지 생성
    const messageRoom = collection(db, 'message2');
    const newId = collection(messageRoom, currentChatId.currentChatRoom.id, 'ChatRoomName')
    console.log(newId.id)
    await Promise.all([
        addDoc(newId, {
            content,
            id:currentChatId.currentChatRoom.id,
            CreateAt:serverTimestamp(),
            CreateUer:{
              name:userInfo.displayName,
              photoURL:userInfo.photoURL
            }
          }),
    
    ]);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleClick()
    setContent('')
    console.log('완료')
  }

  // 메시지 데이터 가져오기
  const getMessageData = async () => {
    if(currentChatId.currentChatRoom === null){
      return
    }
    try{
      const q = query(collectionGroup (db, 'ChatRoomName'),where('id', '==', currentChatId.currentChatRoom.id),orderBy('CreateAt','asc'))
      onSnapshot(q,querySnapshot => {
        // console.log(querySnapshot)
        const newarr = querySnapshot.docs.map(doc => {
          return doc.data({ serverTimestamps: "estimate" })
        })
        setMessages(newarr)
      })
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    getMessageData()
  },[currentChatId])
  return (
    <div>
      <div style={{
      width: '100%',
      height: '330px',
      border: '.2rem solid #ececec',
      borderRadius: '4px',
      padding: '1rem',
      marginBottom: '1rem',
      marginTop:'10px',
      overflowY:'scroll'
    }}
    >
     { 
      messages.length > 0 && 
      messages.map((message,index) => 
        <Message
          key={message.id+message.content+index }
          messageData={message} />
        )
     }
    </div>
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Control
      value={content}
      as="textarea"
      onChange={handleTxtChange}
      rows={3} />
    </Form.Group>
    </Form>
    <div>
    </div>

    <Row>
    <Col>
      <button
          className="message-form-button"
          style={{ width: '100%' }}
          // disabled={loading ? true : false}
          onClick={handleSubmit}
      >
          SEND
      </button>
    </Col>
    <Col>
      <button
          className="message-form-button"
          style={{ width: '100%' }}
          // disabled={loading ? true : false}
      >
          UPLOAD
      </button>
    </Col>
    </Row>
    <input
      accept="image/jpeg, image/png"
      style={{ display: 'none' }}
      type="file"
    />
    </div>
  )
}

export default MessageForm
