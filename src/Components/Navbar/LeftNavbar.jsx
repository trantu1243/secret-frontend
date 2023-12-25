import React from "react";

function LeftNavbar(){
    return(
        <div className="navbar leftNavbar">
            <div className="appName">
                <h1>Secret</h1>
            </div>
            <div>
                <ul className="listLeftNb">
                    <li className="itemLeftNb"><h3>Home</h3></li>
                    <li className="itemLeftNb"><h3>Search</h3></li>
                    <li className="itemLeftNb"><h3>Your post</h3></li>
                    <li className="itemLeftNb"><h3>Your friends</h3></li>
                </ul>
            </div>

        </div>
    )
}

export default LeftNavbar