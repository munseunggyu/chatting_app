import React, { useState, useRef, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { addDoc, collection, collectionGroup, orderBy, getDocs, query, setDoc, where , doc, serverTimestamp} from 'firebase/firestore';
import { db } from '../../../firebase';
import { useSelector } from 'react-redux';


function MessageForm() {
  const [content,setContent] = useState('')
  const handleTxtChange = (e) => setContent(e.target.value)
  const currentChatId = useSelector(state => state.chatReduce)
  
  const handleClick = async () => {
    if(currentChatId.currentChatRoom === null){
      alert('방을 선택해 주세요')
      return
    }
    
    const messageRoom = collection(db, 'message2');
    const newId = collection(messageRoom, currentChatId.currentChatRoom.id, 'ChatRoomName')
    await Promise.all([
        addDoc(newId, {
            name: content,
            id:currentChatId.currentChatRoom.id,
            CreateAt:serverTimestamp()
          }),
    
    ]);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleClick()
    setContent('')
    console.log('완료')
  }

  // 데이터 가져오기
  const getMessageData = async () => {
    if(currentChatId.currentChatRoom === null){
      return
    }
    try{
      const q = query(collectionGroup (db, 'ChatRoomName'),where('id', '==', currentChatId.currentChatRoom.id),orderBy('CreateAt','asc'))
      if(!q) return
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
        });
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    getMessageData()
  },[currentChatId])

  return (
    <div>
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
