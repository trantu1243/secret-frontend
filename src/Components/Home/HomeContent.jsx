import React,{useState, useEffect, useCallback} from "react";
import PostInput from "./PostInput";
import axios from "axios";
import { SERVER_URL } from "../constants";
import InsidePost from "../Post/InsidePost";

function HomeContent(props){
    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [checkLoad, setCheckLoad] = useState(true);
    // const [now, setNow] = useState(Date.now());
    

    const getPostData = useCallback(async ()=>{
        try{
            if (checkLoad)
            {
                console.log(skip);
                const response = await axios.get(SERVER_URL + "/getposts", 
                {
                    headers:{
                        Authorization: `Bearer ${props.token}`
                    },
                    params: {skip:`${skip}`},
                
                });
                if (response.data) {
                    

                    if (response.data.posts.length === 0) {
                        setCheckLoad(false);
                    }else{
                        setPosts(preVal => Array.from(new Set([...preVal, ...response.data.posts])));
                        setCheckLoad(true);
                    }
                }
            }

        }
        catch (e){
            console.log(e);
        }
    },[skip, checkLoad, props.token]);

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
            <PostInput token={props.token} setToken={props.setToken} />
      
            {posts.map((postId)=>(
                <div key={postId} className="itemContent">
                    <InsidePost postId={postId} token={props.token} setToken={props.setToken} />
                </div>
            ))}
    
        </div>
    )
}

export default HomeContent;