import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../Navbar/TopNavbar";
import LeftNavbar from "../Navbar/LeftNavbar";
import RightNavbar from "../Navbar/RightNavbar";
import SecretContent from "./SecretContent";
import "../CSS/home.css"

function Secret(props){
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
            <SecretContent token={props.token} setToken={props.setToken} />
                
        </div>
    )
}

export default Secret;