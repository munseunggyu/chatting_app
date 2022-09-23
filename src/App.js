import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase";

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth,user => {
      if(user){
        console.log('hi')
        navigate('/')
      }else{
        navigate('/login')
      }
    })
  },[])
  return (
    <Routes>
      <Route path="/" element={<ChatPage /> } />
      <Route path="/login" element={<LoginPage /> } />
      <Route path="/register" element={<RegisterPage /> } />
    </Routes>
  );
}

export default App;
