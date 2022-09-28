import { FaRegSmileWink,FaPlus } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChatRoom } from '../../../redux/actions/chatRoom_action';
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
function ChatRooms(){
  const dispatch = useDispatch()
  const currentChatRoom = useSelector(state => state.chatReduce)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeChatRoom,setActiveChatRoom] = useState('')
  const [lista,setList] = useState([])
  const user = useSelector(state => state.user.currentUser)

  // 채팅방 생성시 들어가는 데이터
  const [roomName,setRoomName] = useState('')
  const [roomDes,setRoomDes] = useState('')

  const CreateBy = {
    name:user.displayName,
    image:user.photoURL
  }
  const getlist = () =>{      // 데이터 가져온다.
    const q = query(collection(db,'ChatRooms'),orderBy('CreateAt','desc'))
    onSnapshot(q,snapshot => {
      const newarr = snapshot.docs.map(doc => 
        ({
        id:doc.id,
        ...doc.data(),
      })
      )
      setList(newarr)
    })}


  // 방 클릭 시 해당 리덕스에 저장 및 색상 변경
  const enter = (list) => {
    dispatch(setCurrentChatRoom(list))
    setActiveChatRoom(currentChatRoom.currentChatRoom.id)
    console.log('방에 입장하였습니다.')
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const  newChatRoom = doc(collection(db, "ChatRooms"));
    // later...
    await setDoc(newChatRoom, {id:newChatRoom.id,name:roomName,des:roomDes,CreateBy,CreateAt:new Date()});
    console.log('방을 생성하였습니다')
    handleClose()
  }
  useEffect(() => {
    getlist()
  },[])
  console.log(activeChatRoom,'처음')
  return(
    <div>
      <div style={{position:'relative',with:'100%'
      ,display:'flex',alignItems:'center'}}>
       <FaRegSmileWink style={{ marginRight: 3 }} />
       CHAT ROOMS (1)
       <FaPlus
       onClick={handleShow}
        style={{
            position: 'absolute',
            right: '-10px', cursor: 'pointer'
        }} />
      </div>
      <ul>
          { lista.length>0 &&
            lista.map(list => 
            <li 
              onClick={() => enter(list)}
              key={list.id}
              style={{backgroundColor: 
                activeChatRoom &&
                 list.id === activeChatRoom
                ? '#ffffff45'
                : 'transparent'
              }}
              >{list.name}</li>
            )
          }
          </ul>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a chat room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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