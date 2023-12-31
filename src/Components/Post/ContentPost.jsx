import React from "react";
import { useParams } from "react-router-dom";
import CommentInput from "./CommentInput";
import InsidePost from "./InsidePost";

function ContentPost(){
    const {postId} = useParams();
    return(
        <div className="content">
            <div className="item-content">
                <InsidePost postId={postId} />
                
                <CommentInput />
            </div>  
        </div>
    )
}


export default ContentPost;