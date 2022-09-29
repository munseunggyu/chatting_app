import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions/user_action";
import Loading from "./components/Loading.js";

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user)
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth,user => {
      if(user){
        dispatch(setUser(user))
        // navigate('/')
      }else{
        navigate('/login')
      }
    })
  },[])
  return (
    <Routes>
      {
        userInfo.isLoading 
        ?
        <>
          <Route path="/" element={<Loading />} />
          <Route path="/register" element={<RegisterPage /> } />
          <Route path="/login" element={<LoginPage /> } />
        </>
        : 
          <>
          <Route path="/" element={<ChatPage /> } />
          </>
      }
    </Routes>
    
  );
}

export default App;
