import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { FaRegSmile } from "react-icons/fa"
import { useSelector } from "react-redux"
import { db } from "../../../firebase"

function DirectMessage(){
  const currentUser = useSelector(state => state.user.currentUser)
  console.log(currentUser,'현재 유저')
  const [users,setUsers] = useState([])
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

  useEffect(() => {
    getUsers()
  },[])
  return(
    <div>
    <span style={{ display: 'flex', alignItems: 'center' }}>
        <FaRegSmile style={{ marginRight: 3 }} /> DIRECT ROOMS ({users.length})
    </span>

    <ul style={{ listStyleType: 'none', paddingLeft: '10px' }}>
      {
        users.map(user => 
          <li key={user.email}>
            {user.displayName}
          </li>
          )
      }
    </ul>
  </div>
  )
}

export default DirectMessage