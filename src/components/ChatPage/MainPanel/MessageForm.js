import React, { useState, useRef } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
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
    /**
     * message라는 선택된 채팅방의 아이디를 가진 컬렉션을 추가합니다
     * 컬렉션을 추가할때 아이디값을 지정해서 만듭니다
     */
    const ChatRoomRef = doc(db,'message',currentChatId.currentChatRoom.id)
    /**
     * 컬렉션을 추가 할때 랜덤한 아이디를 생성해 줍니다
     * @params ChatRoomRef 위에서 만든 message 컬렉션과 연결합니다
     * @params 선택된 채팅방의 이름으로 message 컬렉션 하위요소로 추가됩니다
     */
    const ChatRoomName = doc(collection(ChatRoomRef,currentChatId.currentChatRoom.name))
  
    await setDoc(ChatRoomName,{content,id:ChatRoomName.id}) // 문서를 추가 합니다
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleClick()
    console.log('완료')
  }
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
