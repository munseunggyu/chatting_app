import { Route, Routes } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatPage /> } />
      <Route path="/login" element={<LoginPage /> } />
      <Route path="/register" element={<RegisterPage /> } />
    </Routes>
  );
}

export default App;
