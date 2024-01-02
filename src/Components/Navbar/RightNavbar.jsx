import React from "react";
import LogOut from "../Home/LogOut";

function RightNavbar(props){
    return(
        <div className="navbar rightNavbar">
            <LogOut token={props.token} setToken={props.setToken} />

        </div>
    )
}

export default RightNavbar