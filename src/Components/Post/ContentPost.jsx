import React from "react";
import { useParams } from "react-router-dom";
import CommentInput from "./CommentInput";
import InsidePost from "./InsidePost";

function ContentPost(props){
    const {postId} = useParams();
    return(
        <div className="content">
            <div className="item-content">
                <InsidePost postId={postId} token={props.token} setToken={props.setToken} />
                
                <CommentInput postId={postId} />
            </div>  
        </div>
    )
}


export default ContentPost;