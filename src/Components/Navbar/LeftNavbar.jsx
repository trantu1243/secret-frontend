import React from "react";
import { useNavigate } from "react-router-dom";

function LeftNavbar(){
    const navigate = useNavigate();
    function navigateHome(){
        navigate("/home");
    }
    return(
        <div className="navbar leftNavbar">
            <div className="appName">
                <h1>Secret</h1>
            </div>
            <div>
                <ul className="listLeftNb">
                    <li className="itemLeftNb" onClick={navigateHome}><h3>Home</h3></li>
                    <li className="itemLeftNb"><h3>Search</h3></li>
                    <li className="itemLeftNb"><h3>Your post</h3></li>
                    <li className="itemLeftNb"><h3>Your friends</h3></li>
                </ul>
            </div>

        </div>
    )
}

export default LeftNavbar