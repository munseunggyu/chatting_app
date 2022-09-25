import { FaRegSmileWink,FaPlus } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useRef, useState } from 'react';
function ChatRooms(){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a chat room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formRoomName">
              <Form.Label>방 이름</Form.Label>
              <Form.Control
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
              <Form.Control type='text' placeholder='Enter a chat room description'/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ChatRooms