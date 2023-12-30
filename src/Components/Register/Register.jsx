import React,{useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import SecretImg from "../SecretImg";
import { UserContext } from "../App";

import "../CSS/style.css"

function Register(props){
    const navigate = useNavigate();

    const user = useContext(UserContext);

    useEffect (()=>{
        if (user) {
            navigate("/home");
        }
    }, [navigate, user]);
    
    return <div className="container">
        <SecretImg />
        <SignUp token={props.token} setToken={props.setToken} />
    </div>
}

export default Register;