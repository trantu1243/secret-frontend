import React,{useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";

function App() {
  const [isLogin, setCheckLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Login isLogin={isLogin} setCheckLogin={setCheckLogin} />} />
          <Route path="login" element={<Login isLogin={isLogin} setCheckLogin={setCheckLogin} />} />
          <Route path="register" element={<Register isLogin={isLogin} setCheckLogin={setCheckLogin}/>} />
          <Route path="home" element={<Home isLogin={isLogin} setCheckLogin={setCheckLogin} />} />

        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
