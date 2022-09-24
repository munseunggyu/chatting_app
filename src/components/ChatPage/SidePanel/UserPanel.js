import {IoIosChatboxes} from 'react-icons/io'
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image'
import { useSelector } from 'react-redux';

function UserPanel(){
  const userInfo = useSelector(state => state.user.currentUser)
  console.log(userInfo)
  return(
    <>
      <h3>
        <IoIosChatboxes /> Chat App
      </h3>
        <div className='user-panel-con'>
          <Image className='user-panel-img'
           src='https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg'
          roundedCircle />
          <Dropdown>
          <Dropdown.Toggle
            style={{background:'transparent',border:'0px'}}
            variant="success" id="dropdown-basic">
            {userInfo.email}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item >프로필 사진 변경</Dropdown.Item>
            <Dropdown.Item >로그 아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  )
}

export default UserPanel