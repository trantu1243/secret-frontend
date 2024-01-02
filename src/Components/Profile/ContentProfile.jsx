import React,{ useCallback, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import InsidePost from "../Post/InsidePost";
import ProfileInterface from "./ProfileInterface";
import { SERVER_URL } from "../constants";

function ContentProfile(props){
    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [checkLoad, setCheckLoad] = useState(true);
  
    
    const {userId} = useParams();

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
            <ProfileInterface token={props.token} setToken={props.setToken} />

            {posts.map((yourPost)=>{
            
                return(
                    <div key={String(yourPost)} className="item-content">
                        <InsidePost postId={yourPost} token={props.token} setToken={props.setToken} />
                    </div>
                )   
            })}
                
        
        </div>
    )
}

export default ContentProfile;