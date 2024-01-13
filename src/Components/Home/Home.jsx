import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../Navbar/TopNavbar";
import LeftNavbar from "../Navbar/LeftNavbar";
import RightNavbar from "../Navbar/RightNavbar";
import HomeContent from "./HomeContent";
import "../CSS/home.css"

function Home(props){
    const navigate = useNavigate();
   

    useEffect (()=>{
        if (!props.token) {
            navigate("/");
        }
    }, [navigate, props.token]);
    
    return (
        <div className="home">
            <LeftNavbar token={props.token} setToken={props.setToken} />
            <TopNavbar  />
            <RightNavbar token={props.token} setToken={props.setToken} />
            <HomeContent token={props.token} setToken={props.setToken} />
                
        </div>
    )
}

export default Home;