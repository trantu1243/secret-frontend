import React,{useState, useEffect, useContext} from "react";
import {  useNavigate } from "react-router-dom";


import { SERVER_URL } from "../constants";
import { UserContext } from "../App";

import PostInput from "../Home/PostInput";

function ProfileInterface(props){
    const navigate = useNavigate();
    const user = useContext(UserContext);

    const {profileUser, getUser} = props;
    
    // send tonken to server

    const [checkLogin, setCheckLogin] = useState(false);


    //
    useEffect(() =>{
        if (user !== null){
            if (user._id === profileUser._id) {
                setCheckLogin(true);
                return ;
            }
        }
        setCheckLogin(false);
    }, [user, profileUser]);

    const [checkAvatarClick, setCheckAvatarClick] = useState(false);
    const [checkBackgroundClick, setCheckbackgroundClick] = useState(false);

    function handleAvatarClick(){
        setCheckAvatarClick(preVal => (!preVal));
    }

    function handleBackgroundClick() {
        setCheckbackgroundClick(preVal => (!preVal));
    }

    
   
    // Upload avatar and background image
    async function handleBackgroundImage(e){
        const formData = new FormData();
        formData.append('background', e.target.files[0]);

        console.log(formData);
       
        try {
            const res = await fetch(SERVER_URL + "/upload/background", {
                method: "POST",
                body: formData,
                headers:{
                    "Authorization": `Bearer ${props.token}`,
                },
            });
            console.log('Image uploaded successfully');
            if (res) {
                getUser();
                handleBackgroundClick();
            }
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };

    async function handleAvatarImage(e){
        
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);

        console.log(formData);
       
        try {
            const res = await fetch(SERVER_URL + "/upload/avatar", {
                method: "POST",
                body: formData,
                headers:{
                    "Authorization": `Bearer ${props.token}`,
                },
            });
            console.log('Image uploaded successfully');
            if (res) {
                getUser();
                handleAvatarClick();
            }
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };

    //Check follow
    const [checkFollow, setCheckFollow] = useState(false);

    useEffect(()=>{
        if(user && profileUser.followerId.includes(user._id)){
            setCheckFollow(true);
        }
        else {
            setCheckFollow(false);
        }
    },[user, profileUser.followerId]);

    async function follow(){
        try{
            if(user){

                const formData = new URLSearchParams();
                formData.append("id",profileUser._id);
                const response = await fetch(SERVER_URL+"/profile/follow",{
                    method: "POST",
                    body: formData,
                    headers:{
                        "Authorization": `Bearer ${props.token}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
                    
                );
                if (response) {
                    console.log("Follow successfully");
                    getUser();
                }
                setCheckFollow(true);
            } else{
                navigate("/");
            }
            
        }
        catch(e){
            console.log(e);
        }
    }

    async function cancelFollow(){
        try{
    
            const formData = new URLSearchParams();
            formData.append("id", profileUser._id);
            const response = await fetch(SERVER_URL+"/profile/cancelFollow",{
                method: "POST",
                body: formData,
                headers:{
                    "Authorization": `Bearer ${props.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
                
            );
            if (response) {
                console.log("Follow successfully");
                getUser();
            }
            setCheckFollow(false);
         
            
        }
        catch(e){
            console.log(e);
        }
    }
    return (
        <>
            <div className="userProfile">
                <div className="userProfileImage">
                    <img className="backgroundImage" src={profileUser.backgroundImageUrl || "https://th.bing.com/th/id/OIP.Mbp8x3nrhHsiMcJ7p7K-QAHaEK?rs=1&pid=ImgDetMain"} alt="" onClick={handleBackgroundClick} />
                    {(checkBackgroundClick && checkLogin) && <div className="backgroundPopup">
                        <div><p>Show background image</p></div>
                        <label htmlFor="backgroundImageInput" className="customBackgroundImageInput">
                            Upload background image
                        </label>
                        <input type="file" id="backgroundImageInput" accept="image/*" onChange={handleBackgroundImage}/>
                        
                        
                        
                    </div>}
                    <img className="avatarImage" src={profileUser.avatarImageUrl || "https://www.htmlcsscolor.com/preview/128x128/4E4E4E.png"} alt="" onClick={handleAvatarClick} />
                    {(checkAvatarClick && checkLogin) && <div className="avatarPopup">
                        <div><p>Show avatar image</p></div>
                            
                        <label htmlFor="avatarImageInput" className="customAvatarImageInput">
                            Upload avatar image
                        </label>
                        <input type="file" id="avatarImageInput" accept="image/*" onChange={handleAvatarImage} />
                        
                    </div>}
                    {!checkLogin &&<div className="profileButton">
                        {checkFollow ? <button onClick={cancelFollow}>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="19px" height="19px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                        <path d="M4613 4733 c-17 -10 -592 -652 -1278 -1428 -685 -775 -1258 -1420 -1273 -1432 -30 -25 -80 -30 -115 -11 -12 6 -213 185 -446 397 -233 212 -442 398 -465 414 -130 87 -307 99 -454 30 -83 -39 -175 -132 -219 -220 -33 -67 -38 -85 -41 -170 -5 -112 14 -197 60 -269 55 -87 1261 -1556 1302 -1586 176 -130 420 -108 573 51 41 42 361 551 1299 2061 1110 1789 1244 2009 1244 2045 0 51 -28 97 -73 118 -45 22 -74 21 -114 0z"/>
                                    </g>
                                </svg>
                            </span>
                        Followed</button> : <button onClick={follow}>Follow</button>}
                    </div>}
                    
                </div>

                <div className="userProfileContent">
                    <p className="profileUsername">{profileUser.firstName + " " + profileUser.lastName}</p>
                    <p className="profileInfo"><span>{profileUser.followingId.length}</span> Following</p>
                    <p className="profileInfo"><span>{profileUser.followerId.length}</span> Followers</p>
    
                </div>
                
                <div className="profilePost">
                    <div>
                        <p>Posts</p>
                    </div>
                    <div>
                        <p>Likes</p>
                    </div>
                </div>
            </div>
            
            {checkLogin && <PostInput token={props.token} setToken={props.setToken} />}
        </>
    )
}

export default ProfileInterface;