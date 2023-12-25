import React,{useState, useEffect, useCallback} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../constants";

function ContentProfile(){
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
    

    return (

        <div className="content">
            <div className="userProfile">
                <div className="userProfileImage">
                    <img className="backgroundImage" src={profileUser.backgroundImageUrl} alt="" />
                    <img className="avatarImage" src={profileUser.avatarImageUrl} alt="" />
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