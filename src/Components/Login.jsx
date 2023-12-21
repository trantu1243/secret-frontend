import React from "react";
import SignIn from "./SignIn";
import SecretImg from "./SecretImg";
import { useNavigate } from "react-router-dom";

function Login(props){
    const navigate = useNavigate();
    if(props.isLogin){
        navigate("/home");
    }
    return <div className="container">
        <SecretImg />
        <SignIn isLogin={props.isLogin} setCheckLogin={props.setCheckLogin} />
    </div>
}

export default Login;