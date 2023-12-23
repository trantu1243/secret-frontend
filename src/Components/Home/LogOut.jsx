import React from "react";
import { SERVER_URL } from "../constants";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function LogOut(props){
    const navigate = useNavigate();
    async function handleClick(){
        try {
            const response = await axios.get(SERVER_URL + "/logout");
            if (response){
                localStorage.setItem("token","");
                props.setToken("");
                navigate("/");
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return(
        <>
            <button onClick={handleClick}>Log out</button>
        </>
    )
}

export default LogOut;