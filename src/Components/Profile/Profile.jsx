import React from "react";
import TopNavbar from "../Navbar/TopNavbar";
import LeftNavbar from "../Navbar/LeftNavbar";
import RightNavbar from "../Navbar/RightNavbar";
import ContentProfile from "./ContentProfile";
import "../CSS/home.css"


function Profile(){
    return (
        <div className="home">
            <LeftNavbar />
            <TopNavbar />
            <RightNavbar />
            <ContentProfile />
            
        </div>
     )
}

export default Profile;