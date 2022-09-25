import {IoIosChatboxes} from 'react-icons/io'
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import app from '../../../firebase';
import { clearUser, setPhotoURL } from '../../../redux/actions/user_action';
import { useRef } from 'react';
import { getStorage, uploadBytesResumable,ref, getDownloadURL } from 'firebase/storage';
import { getDatabase, update,ref as re } from 'firebase/database';

function UserPanel(){
  const userInfo = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const handelLogout = () => {
    const auth = getAuth(app)
    signOut(auth)
    dispatch(clearUser())
  }
  // 파일 업로드 input을 숨기고 프로필 사진 변경에 연결
  const inputOpenImageRef = useRef()
  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click()
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]
    const metadata = {contentType: file.type}
    const storage = getStorage(app)
    const auth = getAuth(app)
    try {
      if(!file) return
      // 스토리지에 파일 저장하기
      let uploadTask = uploadBytesResumable(ref(storage, `user_image/${userInfo.uid}`), file, metadata) // user_image/${userInfo.uid} 저장한 파일의 경로이다.
      let ImageURL = uploadTask.on('state_change',() => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{ 
          // 프로필 사진 변경
        updateProfile(userInfo,{
          photoURL: downloadURL
        })
        // user reduce에서 사진 변경
        dispatch(setPhotoURL(downloadURL))

        // 데이터베이스에서 사진 변경
        const db = getDatabase(app)
        update(re(db,`users/${userInfo.uid}`),{
          images:downloadURL
        })
      });
      })
     
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <>
      <h3>
        <IoIosChatboxes /> Chat App
      </h3>
        <div className='user-panel-con'>
          <Image className='user-panel-img'
           src={userInfo.photoURL}
          roundedCircle />
          <Dropdown>
          <Dropdown.Toggle
            style={{background:'transparent',border:'0px'}}
            variant="success" id="dropdown-basic">
            {userInfo.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOpenImageRef} >프로필 사진 변경</Dropdown.Item>
            <Dropdown.Item onClick={handelLogout} >로그 아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
      </div>

      <input accept='image/jpeg, image/png'
        ref={inputOpenImageRef}
        onChange={handleUploadImage}
        type='file' style={{display:'none'}} />

    </>
  )
}

export default UserPanel