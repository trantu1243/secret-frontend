import React, { useState, useEffect } from "react";

import Comment from "./Comment";

function Comments(props){
    const [index, setIndex] = useState(5);
    const [comments, setComments] = useState([]);
    const [checkComment, setCheckComment] = useState(true);

    useEffect(()=>{
        if (comments.length >= props.comments.length) {
            setCheckComment(false);
        } else setCheckComment(true);
    }, [props.comments, comments]);

    useEffect(()=>{
        setComments(props.comments.slice(0, index));
    }, [props.comments, index]);

    function moreComments(){
        setIndex(preVal => (preVal + 5));
    }

    return(
        <>
            {comments.map((commentId)=>(
                    <Comment key={commentId} commentId={commentId} token={props.token} setToken={props.setToken} getComments={props.getComments} />
                )
            )}
            {checkComment && <div className="more-comment" onClick={moreComments}><p>Show more comments</p></div>}
        </>
    )
}

export default Comments;