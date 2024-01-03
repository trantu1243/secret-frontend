import React, {useState, useCallback, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import CommentInput from "./CommentInput";
import InsidePost from "./InsidePost";
import Comments from "./Comments";
import axios from "axios";
import { SERVER_URL } from "../constants";

function ContentPost(props){
    const {postId} = useParams();

    // add effect for comment input
    const textareaRef = useRef(null);
    useEffect(() => {
    const textarea = textareaRef.current;

    const handleTextareaInput = () => {
        textarea.style.height = "auto";
        textarea.style.height = (textarea.scrollHeight) + "px";
    };

    if (textarea) {
        textarea.addEventListener("input", handleTextareaInput);

        return () => {
            textarea.removeEventListener("input", handleTextareaInput);
        };
    }
    }, [textareaRef]);


    //
    const [comments, setComments] = useState([]);

    const getComments = useCallback( async()=>{
        try{
            const response = await axios.get(SERVER_URL + "/post/comments/" + postId);
            if (response.data){
         
                setComments(response.data.commentId);
    
            }

        }
        catch (e){
            console.log(e);
        }
    }, [postId]);

    useEffect(()=>{
        getComments();
    },[getComments]);

    

    return(
        <div className="content">
            <div className="item-content">
                <InsidePost postId={postId} token={props.token} setToken={props.setToken} forwardedRef={textareaRef} />
                
                <CommentInput postId={postId} token={props.token} setToken={props.setToken} getComments={getComments} forwardedRef={textareaRef} />
                <Comments comments={comments} token={props.token} setToken={props.setToken} />
            </div>  
        </div>
    )
}


export default ContentPost;