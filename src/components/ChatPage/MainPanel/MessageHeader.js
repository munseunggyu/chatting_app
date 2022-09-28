import { Accordion, Card, Col, Container, Image, Row } from "react-bootstrap"
import { FaLock } from "react-icons/fa"
import {MdFavorite} from 'react-icons/md'
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlineSearch } from 'react-icons/ai';
import FormControl from 'react-bootstrap/FormControl';
function MessageHeader(){
  return(
    <div style={{
      width: '100%',
      height: '190px',
      border: '.2rem solid #ececec',
      borderRadius: '4px',
      padding: '1rem',
      marginBottom: '1rem',
      marginTop:'10px'
  }} >
    <Container>
      <Row>
        <Col><h2> <FaLock /> ChatRoomName <MdFavorite /> </h2> </Col>
        <Col>
          <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
              <AiOutlineSearch />
          </InputGroup.Text>
          <FormControl
              // onChange={handleSearchChange}
              placeholder="Search Messages"
              aria-label="Search"
              aria-describedby="basic-addon1"
          />
      </InputGroup>
        </Col>
      </Row>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p>
              <Image src=''
              // {chatRoom && chatRoom.createdBy.image}
                  roundedCircle style={{ width: '30px', height: '30px' }}
              /> {" "} chatRoom && chatRoom.createdBy.name
          </p>
      </div>
      <Row>
      <Col>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Description</Accordion.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {/* {chatRoom && chatRoom.description} */}
                asdf
              </Card.Body>
            </Accordion.Collapse>
          </Accordion.Item>
        </Accordion>
      </Col>
      <Col>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Posts Count</Accordion.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {/* {userPosts && renderUserPosts(userPosts)} */}
              adsf
            </Card.Body>
            </Accordion.Collapse>
          </Accordion.Item>
        </Accordion>
      </Col>
      </Row>
    
    </Container>
      
    </div>
  )
}

export default MessageHeader