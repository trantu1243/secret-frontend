import React from "react";
import {useNavigate} from "react-router-dom";

function LogOut(props){
    const navigate = useNavigate();
    async function handleClick(){
        try {
           
            localStorage.setItem("token","");
            props.setToken("");
            navigate("/");
            
        }
        catch (e) {
            console.log(e);
        }
    }
    return(
        <div className="log-out">
            <button onClick={handleClick}>Log out</button>
        </div>
    )
}

export default LogOut;