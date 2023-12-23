import React,{useEffect, useCallback} from "react";
import SignIn from "./SignIn";
import SecretImg from "../SecretImg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../constants";

function Login(props){
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
        <SignIn token={props.token} setToken={props.setToken} />
    </div>
}

export default Login;