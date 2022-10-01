import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { FaRegSmile } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { db } from "../../../firebase"
import { setPriveChatRoom } from "../../../redux/actions/chatRoom_action"

function DirectMessage(){
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const [users,setUsers] = useState([])
  const [txt,setTxt] = useState('')
  const [lists,setLists] =useState([])
  const getUsers = async () => {
    const userDB = query(collection(db,'users'),orderBy('email','desc'))
    if(!userDB) return
    onSnapshot(userDB,snapshot => {
      
      let newa = snapshot.docs.map(doc => doc.data())
      setUsers(prev => {
        return newa.filter(data => data.uid !==currentUser.uid) 
      })
    }
    )
  }
  const CreateDMRoomId = (selectUser) => {  // DM의 같은 ID 값을 유지해주기 위해서
    return currentUser.uid > selectUser
    ? `${selectUser}${currentUser.uid}`
    :`${currentUser.uid}${selectUser}`
  }
  const dmRoomCreate = async (dmRoomId) =>{
  const dmid = CreateDMRoomId(dmRoomId.uid) // DM방 생성
  const dmRoom = doc(db,'DMROOMS',dmid)
  setDoc(dmRoom,{
    id:dmid,
    otherUser:dmRoomId.uid,
    ids:[dmRoomId.uid,currentUser.uid],
    names:[dmRoomId.displayName,currentUser.displayName]
  })
  console.log('DM방 생성')
}
const getDMROOMS = () => {    //  [방 생성자id,상대방id ]데이터 넣어준 후 DM방 데이터 가져올 시 [클릭한 유저]가 있는 list만 가져온다.
  const q = query(collection(db,'DMROOMS'),where('ids','array-contains-any',[currentUser.uid]))
  onSnapshot(q,snapshot => {
    const newarr = snapshot.docs.map(doc => 
      ({
      id:doc.id,
      ...doc.data(),
    })
    )
    setLists(newarr)
  })
}

const enterPriveRoom = (list) => {
  dispatch(setPriveChatRoom(list))
  console.log('private room에 입장하였습니다.')
}

  useEffect(() => {
    getUsers()
    getDMROOMS()
  },[])
  return(
    <div>
    <span style={{ display: 'flex', alignItems: 'center' }}>
        <FaRegSmile style={{ marginRight: 3 }} /> DIRECT ROOMS ({users.length})
    </span>

    <ul style={{ listStyleType: 'none', paddingLeft: '10px' }}>
      <li>#User 목록</li>
      {
        users.map(user => 
          <li
            key={user.uid}
            onClick={() => dmRoomCreate(user)}
          >
            ID:{user.displayName}
          </li>
          )
      }
    </ul>
    <ul>
      <li>#DM방</li>
      {
        lists.length > 0 && lists.map(list => 
            <li
              key={list.id}
              onClick={() => enterPriveRoom(list)}
            >
               userid:{list.names.filter(v => v !== currentUser.displayName)}
            </li>
          )
      }
    </ul>
  </div>
  )
}

export default DirectMessage