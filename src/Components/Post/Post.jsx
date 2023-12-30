import React from "react";
import TopNavbar from "../Navbar/TopNavbar";
import LeftNavbar from "../Navbar/LeftNavbar";
import RightNavbar from "../Navbar/RightNavbar";
import ContentPost from "./ContentPost";
import "../CSS/home.css"

function Post(){
    return (
        <div className="home">
            <LeftNavbar />
            <TopNavbar />
            <RightNavbar />
            
            <ContentPost />
        </div>
    )
}

export default Post;