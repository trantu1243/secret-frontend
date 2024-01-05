import React, {useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopNavbar from "../Navbar/TopNavbar";
import LeftNavbar from "../Navbar/LeftNavbar";
import RightNavbar from "../Navbar/RightNavbar";
import EditPost from "./EditPost";
import "../CSS/home.css"

function Edit(props){
    const navigate = useNavigate();
    const {postId} = useParams();

    useEffect (()=>{
        if (!props.token) {
            navigate("/");
        }
    }, [navigate, props.token]);
    
    return (
      <div className="home">
            <LeftNavbar />
            <TopNavbar />
            <RightNavbar token={props.token} setToken={props.setToken} />
            <div className="content">
                <EditPost token={props.token} setToken={props.setToken} postId={postId} />
            </div>
          
            
      </div>
    )
}

export default Edit;