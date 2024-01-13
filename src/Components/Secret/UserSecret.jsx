import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../Navbar/TopNavbar";
import LeftNavbar from "../Navbar/LeftNavbar";
import RightNavbar from "../Navbar/RightNavbar";
import YourSecret from "./YourSecret";
import "../CSS/home.css"

function UserSecret(props){
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
            <YourSecret token={props.token} setToken={props.setToken} />
                
        </div>
    )
}

export default UserSecret;