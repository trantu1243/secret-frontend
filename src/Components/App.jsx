import React,{useState} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Register from "./Register/Register";
import Profile from "./Profile/Profile";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login token={token} setToken={setToken} />,
    },
    {
      path: "login",
      element: <Login token={token} setToken={setToken} />,
    },
    {
      path: "register", 
      element: <Register token={token} setToken={setToken}/>,
    },
    {
      path:"home", 
      element: <Home token={token} setToken={setToken} />,
    },
    {
      path:"profile/:userId",
      element: <Profile token={token} setToken={setToken} />
    },
  ]);
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;



// <BrowserRouter>
//       <Routes>
//         <Route path="/" >
//           <Route index element={<Login isLogin={isLogin} setCheckLogin={setCheckLogin} />} />
//           <Route path="login" element={<Login isLogin={isLogin} setCheckLogin={setCheckLogin} />} />
//           <Route path="register" element={<Register isLogin={isLogin} setCheckLogin={setCheckLogin}/>} />
//           <Route path="home" element={<Home isLogin={isLogin} setCheckLogin={setCheckLogin} />} />

//         </Route>
//       </Routes>
//     </BrowserRouter>