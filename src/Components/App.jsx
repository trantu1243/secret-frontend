import React,{useState, createContext, useCallback, useEffect} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Register from "./Register/Register";
import Profile from "./Profile/Profile";
import axios from "axios";
import { SERVER_URL } from "./constants";
import Post from "./Post/Post";
import Edit from "./Post/Edit";
import Notification from "./Notification/Notification";
import Secret from "./Secret/Secret";
import UserSecret from "./Secret/UserSecret";
import SettingPage from "./Setting/Setting";
import ChangePass from "./Setting/ChangePass";
import EditProfile from "./Setting/EditProfile";

const UserContext = createContext();

function App() {

    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const [user, setUser] = useState(null);

    const onLoginSuccess = useCallback(async() => {
        try{
            const response = await axios.get(SERVER_URL + "/login", {headers:{Authorization:`Bearer ${token}`}});
            if (response.data){
             
                setUser(response.data);
                
            } else {
                localStorage.removeItem("token");
                setToken("");
                setUser(null);
            }
        }
        catch (e) {
            console.log(e);
            localStorage.removeItem("token");
           
            setToken("");
            setUser(null);
        }
      
      
    },[setUser, token, setToken]);

    useEffect(() =>{
        if (token) onLoginSuccess();
        else setUser(null);
    },[token, onLoginSuccess]);
    
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
        {
            path:"post/:postId",
            element: <Post token={token} setToken={setToken} />
        },
        {
            path:"edit/:postId",
            element: <Edit token={token} setToken={setToken} />
        },
        {
            path:"notification",
            element: <Notification token={token} setToken={setToken} />
        },
        {
            path:"secret",
            element: <Secret token={token} setToken={setToken} />
        },
        {
            path:"yoursecret",
            element: <UserSecret token={token} setToken={setToken} />
        },
        {
            path:"setting",
            element: <SettingPage token={token} setToken={setToken} />
        },
        {
            path:"changepassword",
            element: <ChangePass token={token} setToken={setToken} />
        },
        {
            path:"editprofile",
            element: <EditProfile token={token} setToken={setToken} />
        }
    ]);
    
      
    return (
        <UserContext.Provider value={user}>
            <RouterProvider router={router}/>
        </UserContext.Provider>
    );
}

export {UserContext};

export default App;




