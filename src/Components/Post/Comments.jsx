import React from "react";

import Comment from "./Comment";

function Comments(props){
    

    return(
        <>
            {props.comments.map((commentId)=>{
                return (
                    <Comment commentId={commentId} token={props.token} setToken={props.setToken} />
                )
            })}
        </>
    )
}

export default Comments;