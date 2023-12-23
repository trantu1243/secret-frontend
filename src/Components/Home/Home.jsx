import React from "react";
import LogOut from "./LogOut";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import LeftNavbar from "./LeftNavbar";


function Home(props){
    const navigate = useNavigate();
    React.useEffect(() => {
        if(!props.token) {
          navigate("/");
        }
    }, [props.token, navigate]);
      
    return (
       <div className="home">
            <LogOut token={props.token} setToken={props.setToken} />
            <Navbar />
            <LeftNavbar />
       </div>
    )
}

export default Home;