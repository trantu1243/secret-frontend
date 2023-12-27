import React,{useState, useEffect, useCallback} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../constants";

function ContentProfile(props){
    const [profileUser, setProfileUser] = useState({
        id:"",
        firstName: "",
        lastName: "",
        avatarImageUrl: "",
        backgroundImageUrl:"",
    });
    const {userId} = useParams();

    const getUser = useCallback(async()=>{
        try{
            const response = await axios.get(SERVER_URL + "/profile/" + userId);
            if (response.data){
                console.log(response.data);
                setProfileUser({
                    id:response.data._id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    avatarImageUrl: response.data.avatarImageUrl,
                    backgroundImageUrl:response.data.backgroundImageUrl,
                });
               
              
            }
        }
        catch (e){
            console.log(e);
        }
    }, [userId]);

    useEffect(() => {
        getUser();
    }, [getUser]);
    
    // send tonken to server

    const [loginUserId, setUserId] = useState("");
    const [checkLogin, setCheckLogin] = useState(false);

    const onLoginSuccess = useCallback(async() => {
        try{
            const response = await axios.get(SERVER_URL + "/login", {headers:{Authorization:`Bearer ${props.token}`}});
            if (response.data){
                console.log(response.data.id);
                setUserId(response.data.id);
            }
        }
        catch (e) {
            console.log(e);
            localStorage.setItem("token","");
            props.setToken("");
        }
        
        
      },[props, setUserId]);
    
    useEffect(() =>{
        if (props.token) onLoginSuccess();
    },[props.token, onLoginSuccess]);
    
    const handleCheckLogin = useCallback(()=>{
        if (loginUserId === profileUser.id) {
            setCheckLogin(true);
        }
    },[loginUserId, profileUser.id])

    useEffect(() =>{
        if (loginUserId) handleCheckLogin();
    }, [loginUserId, handleCheckLogin]);

    const [checkAvatarClick, setCheckAvatarClick] = useState(false);
    const [checkBackgroundClick, setCheckbackgroundClick] = useState(false);

    function handleAvatarClick(){
        setCheckAvatarClick(preVal => (!preVal));
    }

    function handleBackgroundClick() {
        setCheckbackgroundClick(preVal => (!preVal));
    }

    
   

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
                window.location.reload();
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
                window.location.reload();
            }
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };

    return (

        <div className="content">
            <div className="userProfile">
                <div className="userProfileImage">
                    <img className="backgroundImage" src={profileUser.backgroundImageUrl} alt="" onClick={handleBackgroundClick} />
                    {(checkBackgroundClick && checkLogin) && <div className="backgroundPopup">
                        <div><p>Show background image</p></div>
                        <label htmlFor="backgroundImageInput" className="customBackgroundImageInput">
                            Upload background image
                        </label>
                        <input type="file" id="backgroundImageInput" accept="image/*" onChange={handleBackgroundImage}/>
                        
                        
                        
                    </div>}
                    <img className="avatarImage" src={profileUser.avatarImageUrl} alt="" onClick={handleAvatarClick} />
                    {(checkAvatarClick && checkLogin) && <div className="avatarPopup">
                        <div><p>Show avatar image</p></div>
                            
                        <label htmlFor="avatarImageInput" className="customAvatarImageInput">
                            Upload avatar image
                        </label>
                        <input type="file" id="avatarImageInput" accept="image/*" onChange={handleAvatarImage} />
                        
                    </div>}
                    <div className="profileButton">
                        <button>Follow</button>
                    </div>
                </div>

                <div className="userProfileContent">
                    <p className="profileUsername">{profileUser.firstName + " " + profileUser.lastName}</p>
                    <p className="profileInfo"><span>2</span> Following</p>
                    <p className="profileInfo"><span>99</span> Followers</p>
    
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
            
        </div>
    )
}

export default ContentProfile;