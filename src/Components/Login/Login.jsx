import React,{useEffect, useContext} from "react";
import SignIn from "./SignIn";
import SecretImg from "../SecretImg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "../CSS/style.css";

function Login(props){
    const navigate = useNavigate();

    const user = useContext(UserContext);

    useEffect (()=>{
        console.log(user);
        if (user) {
            navigate("/home");
        }
    }, [navigate, user]);

    return <div className="container">
        <SecretImg />
        <SignIn token={props.token} setToken={props.setToken} />
    </div>
}

export default Login;