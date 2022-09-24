import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions/user_action";

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user)
  console.log(userInfo,'유저 정보임돠')
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth,user => {
      if(user){
        console.log(user)
        dispatch(setUser(user))
      }else{
      }
    })
  },[])
  return (
    <Routes>

    { userInfo ?
      <>
        <Route path="/" element={<ChatPage /> } />
      </>
      : 
      <>
        <Route path="/" element={<RegisterPage /> } />
        <Route path="/login" element={<LoginPage /> } />
      </>
    }
    </Routes>
    
  );
}

export default App;
