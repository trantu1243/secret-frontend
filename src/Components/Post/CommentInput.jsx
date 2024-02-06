import React, {useEffect, useContext, useState} from "react";
import { UserContext } from "../App";
import { SERVER_URL } from "../constants";

function CommentInput(props){

    const user = useContext(UserContext);
    const [avatarImageUrl, setAvatarImageUrl] = useState("");
    useEffect(()=>{
        if (user) {
            setAvatarImageUrl(user.avatarImageUrl);
        }
    },[user]);
    
    

    //handle comment input
    const [commentInput, setCommetInput] = useState("");
    const [checkComment, setCheckComment] = useState(false);

    function handleCommentInput(e){
        setCommetInput(e.target.value);
    }

    useEffect(()=>{
        if (commentInput) setCheckComment(true);
        else setCheckComment(false);
    },[commentInput]);

    async function sendComment(e){
        e.preventDefault();
        try{
            const formData = new URLSearchParams();
            formData.append("text", commentInput);
            formData.append("postId", props.postId);
            const response = await fetch(SERVER_URL + "/comment",{
                method:"POST",
                body:formData,
                headers:{
                    "Authorization": `Bearer ${props.token}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            });
            if(response){
                console.log("Success");
                props.getComments();
                setCommetInput("");
            }
        }
        catch (e){
            console.log(e);
        }
    }

    useEffect(()=>{
        props.forwardedRef.current.focus();
    },[props.forwardedRef]);

    return(
        <div className="commentInput">
            <div className="commentLine"></div>
            <div className="inputPost ">
                <img 
                    className="avatar" 
                    src={avatarImageUrl || "https://trantu-secret.s3.ap-southeast-2.amazonaws.com/60f1fe16956559.562b39813b082.jpg"} 
                    alt="" 
                    
                />
                <form className="comment-form">
                    <textarea 
                        
                        ref={props.forwardedRef} 
                        rows="1" 
                        type="text" 
                        placeholder="Post your comment" 
                        name="commentInput"
                        value={commentInput}
                        onChange={handleCommentInput}
                        
                    ></textarea>
                    
                    <button 
                        type="submit" 
                        className={"check-comment-button " + (!checkComment && "check-comment-false")}
                        onClick={sendComment} 
                        disabled={!checkComment}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="33px" height="33px" viewBox="0 0 24 24" id="send">
                            <path fill="none" d="M0 0h24v24H0V0z"/>
                            <path fill="#1f8fff" d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"/>
                        </svg>
                    </button>
                </form>
            </div>
            <div className="commentLine"></div>
        </div>
    )
}

export default CommentInput;