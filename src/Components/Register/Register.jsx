import React,{useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import SecretImg from "../SecretImg";
import axios from "axios";
import { SERVER_URL } from "../constants";
import "../CSS/style.css"

function Register(props){
    const navigate = useNavigate();

    const onLoginSuccess = useCallback(async() => {
        try{
            const response = await axios.get(SERVER_URL + "/login", {headers:{Authorization:props.token}});
            if (response.data){
              console.log(response.data.message);
              navigate("/home");
            }
        }
        catch (e) {
            console.log(e);
        }
        
        
      },[props.token, navigate]);
  
    useEffect(() =>{
        if (props.token) onLoginSuccess();
    },[props.token, onLoginSuccess]);
    
    return <div className="container">
        <SecretImg />
        <SignUp token={props.token} setToken={props.setToken} />
    </div>
}

export default Register;