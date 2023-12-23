import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import SecretImg from "../SecretImg";

function Register(props){
    const navigate = useNavigate();

    useEffect(()=>{
        if(props.token){
            navigate("/");
        }
    },[props.token, navigate]);
    
    return <div className="container">
        <SecretImg />
        <SignUp token={props.token} setToken={props.setToken} />
    </div>
}

export default Register;