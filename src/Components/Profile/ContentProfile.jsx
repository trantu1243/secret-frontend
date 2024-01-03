import React,{ useCallback, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import InsidePost from "../Post/InsidePost";
import ProfileInterface from "./ProfileInterface";
import { SERVER_URL } from "../constants";

function ContentProfile(props){
    

    const [profileUser, setProfileUser] = useState({
        _id:"",
        firstName: "",
        lastName: "",
        avatarImageUrl: "",
        backgroundImageUrl: "",
        image:[],
        yourPostId:[],
        yourSecretId:[],
        repostId:[],
        followerId:[],
        followingId:[],
        like:[],
        comment:[],
    });
    const {userId} = useParams();

    const getUser = useCallback(async()=>{
        try{
            const response = await axios.get(SERVER_URL + "/profile/" + userId);
            if (response.data){
                console.log(response.data);
                setProfileUser(response.data);
            }
        }
        catch (e){
            console.log(e);
        }
    }, [userId]);

    useEffect(() => {
        getUser();
    }, [getUser]);
  

    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [checkLoad, setCheckLoad] = useState(true);


    const getPostData = useCallback(async ()=>{
        try{
            if (checkLoad)
            {
                const response = await axios.get(SERVER_URL + "/profilePosts", 
                {
                    params: {skip:`${skip}`, id:userId},
                
                });
                if (response.data) {
                  
                    setPosts(preVal => Array.from(new Set([...preVal, ...response.data.posts])));

                    if (response.data.posts.length === 0){
                        setCheckLoad(false);
                    }

       
                }
            }

        }
        catch (e){
            console.log(e);
        }
    },[skip, checkLoad, userId]);

    useEffect(()=>{
        getPostData();
    },[getPostData]);

    useEffect(() => {
        const handleScroll = () => {
            if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
  
                if(checkLoad) setSkip(preVal => (preVal + 5));
        
            }
        };
        window.addEventListener("scroll", handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [checkLoad, posts]);

    return (

        <div className="content">
            <ProfileInterface token={props.token} setToken={props.setToken} profileUser={profileUser} getUser={getUser} />

            {posts.map((yourPost)=>{
            
                return(
                    <div key={String(yourPost)} className="item-content">
                        <InsidePost postId={yourPost} token={props.token} setToken={props.setToken} profileId={profileUser._id} profileName={profileUser.firstName + " " + profileUser.lastName} />
                    </div>
                )   
            })}
                
        
        </div>
    )
}

export default ContentProfile;