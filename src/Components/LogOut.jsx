import React from "react";
import { SERVER_URL } from "./constants";
import {useNavigate} from "react-router-dom";

function LogOut(props){
    const navigate = useNavigate();
    async function handleClick(){
        try {
            const response = await fetch(SERVER_URL + "/logout");
            if (response.ok){
                props.setCheckLogin(false);
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