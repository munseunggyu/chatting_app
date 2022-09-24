import {IoIosChatboxes} from 'react-icons/io'
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import app from '../../../firebase';
import { clearUser } from '../../../redux/actions/user_action';

function UserPanel(){
  const userInfo = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const handelLogout = () => {
    const auth = getAuth(app)
    signOut(auth)
    dispatch(clearUser())
  }
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
            {userInfo && userInfo.email}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item >프로필 사진 변경</Dropdown.Item>
            <Dropdown.Item onClick={handelLogout} >로그 아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  )
}

export default UserPanel