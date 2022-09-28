import { FaRegSmileWink,FaPlus } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { child, get, getDatabase, onChildAdded, onValue, push, ref, update } from 'firebase/database';
import app from '../../../firebase';
function ChatRooms(){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector(state => state.user.currentUser)

  
  
  // 채팅방 생성시 들어가는 데이터
  const [roomName,setRoomName] = useState('')
  const [roomDes,setRoomDes] = useState('')


  const addChatRoom = async () => {
  // 시간 순으로 자동으로 정렬된다. 자동으로 해당 방의 키값 생성
  const chatRoomKey = push(child(ref(getDatabase(app)), 'chatRooms')).key;
  const newChatRoom = {
    id:chatRoomKey,
    name:roomName,
    description:roomDes,
    CreateBy:{
      name:user.displayName,
      image:user.photoURL
    }
  }

    try{
      await update(ref(getDatabase(app),`chatRooms/${chatRoomKey}`),newChatRoom)
    }catch(error){
      console.log(error)
    }
  }
  const handleSubmit = (e) => { // 생성 버튼 클릭시 실행
    e.preventDefault()
    if(roomName && roomDes){
      addChatRoom()
      handleClose()
    }
  }

  // {
  //   CreateBy: image,name,
  //   description,
  //   id,
  //   name,
  // }
  // 채팅방 리스트 불러오기
  const [chatRoomsArray,setChatRoomsArray] = useState([])
  const AddRoomsListeners = () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `chatRooms`);
    onChildAdded(dbRef, (data) => {    
      setChatRoomsArray(prev => {
        return [...prev,{...data.val()}]
      })
    })
  }
  useEffect(() => { 
    AddRoomsListeners()
  },[])
  console.log(chatRoomsArray.length)
  return(
    <div>
      <div style={{position:'relative',with:'100%'
      ,display:'flex',alignItems:'center'}}>
       <FaRegSmileWink style={{ marginRight: 3 }} />
       CHAT ROOMS (1)
       <FaPlus
       onClick={handleShow}
        // onClick={this.handleShow}
        style={{
            position: 'absolute',
            right: '-10px', cursor: 'pointer'
        }} />
      </div>
      <ul>
          {
            chatRoomsArray.map(list => 
            <li key={list.id}>{list.name}</li>
            )
          }
          </ul>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a chat room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onClick={handleSubmit}>
            <Form.Group className="mb-3" controlId="formRoomName">
              <Form.Label>방 이름</Form.Label>
              <Form.Control
                onChange={(e) => setRoomName(e.target.value)}
                type="text"
                placeholder='Enter a chat room name'
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formRoomDescription"
            >
              <Form.Label>방 설명</Form.Label>
              <Form.Control 
              onChange={(e) => setRoomDes(e.target.value)}
              type='text' placeholder='Enter a chat room description'/>
            </Form.Group>
          </Form>
   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            방생성
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default ChatRooms