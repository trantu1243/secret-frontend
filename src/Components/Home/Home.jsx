import React from "react";
import LogOut from "./LogOut";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../Navbar/TopNavbar";
import LeftNavbar from "../Navbar/LeftNavbar";
import RightNavbar from "../Navbar/RightNavbar";
import HomeContent from "./HomeContent";
import "../CSS/home.css"

function Home(props){
    const navigate = useNavigate();
    React.useEffect(() => {
        if(!props.token) {
          navigate("/");
        }
    }, [props.token, navigate]);
      
    return (
       <div className="home">
            <LeftNavbar />
            <TopNavbar />
            <RightNavbar />
            <HomeContent />
            
            <LogOut token={props.token} setToken={props.setToken} />
       </div>
    )
}

export default Home;