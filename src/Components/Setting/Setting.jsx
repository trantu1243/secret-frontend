import React from "react";
import LeftNavbar from "../Navbar/LeftNavbar";
import TopNavbar from "../Navbar/TopNavbar";
import RightNavbar from "../Navbar/RightNavbar";
import SettingContent from "./SettingContent";

function SettingPage(props){
    return (
        <div className="home">
            <LeftNavbar token={props.token} setToken={props.setToken} />
            <TopNavbar  />
            <RightNavbar token={props.token} setToken={props.setToken} />

            <SettingContent token={props.token} setToken={props.setToken} /> 
        </div>
    )
}

export default SettingPage;