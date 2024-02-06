import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";


function SettingContent(props){
    const navigate = useNavigate();
    const user = useContext(UserContext);
    function navigateChangePass(){
        if (user) {
            navigate("/changepassword");
            window.scrollTo({
                top: 0,
                behavior: "instant",
            });
        }
    }

    function navigateEditPr(){
        if (user) {
            navigate("/editprofile");
            window.scrollTo({
                top: 0,
                behavior: "instant",
            });
        }
    }
    async function handleLogout(){
        try {
           
            localStorage.setItem("token","");
            props.setToken("");
            navigate("/");
            
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="content">
            <div className="setting-item" onClick={navigateEditPr}>
                <p>Edit profile</p>
            </div>
            <div className="setting-item" onClick={navigateChangePass}>
                <p>Change password</p>
            </div>
            <div className="setting-item" onClick={handleLogout}>
                <p>Log out</p>
            </div>
        </div>
    )
}

export default SettingContent;