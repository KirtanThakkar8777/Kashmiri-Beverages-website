import Hero from "./components/Hero";
import { Routes, Route } from "react-router-dom";
import ScrollToHash from "./components/ScrollToHash";
import Messages from "./components/Admin/Messages";
import Login from "./components/Admin/Login";
import Checkauth from "./components/Admin/Checkauth";
import "./App.css";
function App() {
  return (
    <>
    <ScrollToHash />
     <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/Message" element={
        <Checkauth>
          <Messages/>
        </Checkauth>
      } />
      <Route path="/Login" element={<Login />} />
     </Routes>
    </>
  );
}

export default App;
