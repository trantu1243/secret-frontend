import React, {useEffect, useRef} from "react";

function CommentInput(){

     // add effect for commet input
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
    return(
        <div className="commentInput">
            <div className="commentLine"></div>
            <div className="inputPost ">
                    <img 
                        className="avatar" 
                        src={"https://trantu1243.blob.core.windows.net/loadimage-11ee-814b-45e4577e52de/60f1fe16956559.562b39813b082.jpg"} 
                        alt="" 
                        
                    />
                    <form className="comment-form">
                        <textarea 

                            ref={textareaRef} 
                            rows="1" type="text" 
                            placeholder="Post your comment" 
                            name="yourPost"
                           
                           
                        ></textarea>
                        
                        <button type="submit" className="check-comment-button" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="33px" height="33px" viewBox="0 0 24 24" id="send">
                                <path fill="none" d="M0 0h24v24H0V0z"/>
                                <path fill="#1f8fff" d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"/>
                            </svg>
                        </button>
                    </form>
                </div>
        </div>
    )
}

export default CommentInput;