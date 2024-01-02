import React from "react";
import TopNavbar from "../Navbar/TopNavbar";
import LeftNavbar from "../Navbar/LeftNavbar";
import RightNavbar from "../Navbar/RightNavbar";
import ContentPost from "./ContentPost";
import "../CSS/home.css"

function Post(props){
    return (
        <div className="home">
            <LeftNavbar />
            <TopNavbar />
            <RightNavbar token={props.token} setToken={props.setToken}/>
            
            <ContentPost token={props.token} setToken={props.setToken}/>
        </div>
    )
}

export default Post;