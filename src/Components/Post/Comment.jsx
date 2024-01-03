import axios from "axios";
import React, {useState, useCallback, useEffect, useContext} from "react";
import moment from "moment";

import { UserContext } from "../App";
import { SERVER_URL } from "../constants";

function Comment(props){
    const [cmt, setCmt] = useState({
        _id:"",
        userId:"",
        postId: "",
        name:"",
        avatarImageUrl: "",
        like:[],
        comment: [],
        content:String,
        commentDate: null,
    });

    const [like, setLike] = useState(false);

    const getComment = useCallback(async()=>{
        try{
            const response = await axios.get(SERVER_URL + "/comment/" +props.commentId);
            if (response.data){
                setCmt(response.data);
            }
        }
        catch (e){
            console.log(e);
        }
    },[props.commentId]);
    useEffect(()=>{
        getComment();
    },[getComment, like]);

    // handle comment date
    const [timeFromNow, setTimeFromNow] = useState("");
    useEffect(()=>{
        if(cmt.commentDate){
            const now = moment();
            const postDate = moment(cmt.commentDate);

            const minutesAgo = now.diff(postDate,"minutes");
            const hourAgo = now.diff(postDate, "hours");
            const dayAgo = now.diff(postDate, "days");

            if (minutesAgo < 60){
                setTimeFromNow(moment.duration(minutesAgo, "minutes").humanize());
            } 
            else  if(hourAgo < 24){
                setTimeFromNow(moment.duration(hourAgo, "hours").humanize());
            }
            else if(dayAgo < 7){
                setTimeFromNow(moment.duration(dayAgo,"days").humanize());
            }
            else{
                setTimeFromNow(postDate.format("MMMM Do YYYY"));
            }
        };
    },[cmt.commentDate]);

    // handle like

    const user = useContext(UserContext);

    useEffect(()=>{
        if (user && cmt.like.includes(user._id)) {
            setLike(true);
        } else{
            setLike(false);
        }
    },[cmt.like, user]);

    async function handleLike(){
        try{
            console.log(like);
            const formData = new URLSearchParams();
            formData.append("id", cmt._id);
            const response = await fetch(SERVER_URL + "/comment/like",{
                method:"PATCH",
                body: formData,
                headers:{
                    "Authorization": `Bearer ${props.token}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            if (response){
                console.log("like successful");
                
            }
            setLike(true);
            
        }
        catch(e){
            console.log(e);
        }
        

    }

    async function handleUnlike(){
        try{
            console.log(like);
            const formData = new URLSearchParams();
            formData.append("id", cmt._id);
            const response = await fetch(SERVER_URL + "/comment/unlike",{
                method:"PATCH",
                body: formData,
                headers:{
                    "Authorization": `Bearer ${props.token}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            
            if (response){
                console.log("unlike successful");
                
            }
            setLike(false);
            
        }
        catch(e){
            console.log(e);
        }
        

    }

    return (
        <div className="comment-component">
            <div className="commentContent">
                <img 
                    className="avatar" 
                    src={cmt.avatarImageUrl || "https://trantu1243.blob.core.windows.net/loadimage-11ee-814b-45e4577e52de/60f1fe16956559.562b39813b082.jpg"} 
                    alt="" 
                  
                />
                <div>
                    <p className="username comment-username" >{cmt.name} &nbsp;</p>
                    <p className="commentTime">{timeFromNow}</p>
                    <p className="commentText">{cmt.content}</p>
                </div>
                
            </div>
            <div className="action-comment">
                

                {like? <div className="itemAction-comment heart" onClick={handleUnlike}>
                    <svg viewBox="0 0 25 25" fill="red" height="27px" width="27px" aria-hidden="true">
                        <g>
                            <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z">
                            </path>
                        </g>
                    </svg>
                    <p style={{color:"red"}}>{cmt.like.length}</p>
                </div> 
                :<div className="itemAction-comment heart" onClick={handleLike}>
                    <svg fill="rgb(207, 207, 207)" height="27px" width="27px" version="1.1">
                        <g>
                            <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z">
                            </path>
                        </g>
                    </svg>
                    <p>{cmt.like.length}</p>
                </div>}
                <div className="itemAction-comment comment">
                    <svg fill="rgb(207, 207, 207)" height="27px" width="27px" version="1.1">
                        <g>
                            <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z">
                            </path>
                        </g>
                    </svg>
                    <p>{cmt.comment.length}</p>
                </div>
            </div>
            
            
        </div>
    )
}

export default Comment;