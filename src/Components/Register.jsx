import React from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import SecretImg from "./SecretImg";

function Register(props){
    const navigate = useNavigate();
    if(props.isLogin){
        navigate("/home");
    }
    return <div className="container">
        <SecretImg />
        <SignUp isLogin={props.isLogin} setCheckLogin={props.setCheckLogin} />
    </div>
}

export default Register;