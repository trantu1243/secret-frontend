import React, {useEffect, useRef, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { SERVER_URL } from "../constants";

function PostInput(props){
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [avatarImageUrl, setAvatarImageUrl] = useState("");
    useEffect(()=>{
        if (user === null) navigate("/");
        else{
            setAvatarImageUrl(user.avatarImageUrl);
        }
    },[user, navigate]);

    function navigateProfile(){
        if (user._id) {
            navigate("/profile/" + user._id);
        }
    }

    // add effect for post input
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

    // Handle post input
    const [yourPost, setYourPost] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [checkInput, setCheckInput] = useState(false);
    const [checkImage, setCheckImage] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    function handlePostInput(e){
        const {value} = e.target;
        setYourPost(value);

    }

    useEffect(()=>{
        if (imageFile || yourPost) setCheckInput(true);
        else setCheckInput(false);
    },[imageFile, yourPost]);

    function handlePostImage(e){
        setImageFile(e.target.files[0]);
        setCheckImage(true);

        const previewURL = URL.createObjectURL(e.target.files[0]);
        setPreviewImage(previewURL);
    }

    function handleImageCancel(){
        setImageFile(null);
        setCheckImage(false);

        URL.revokeObjectURL(previewImage);
        setPreviewImage(null);
    }

    function handlePostSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        if (yourPost) formData.append("text", yourPost);
        if (imageFile) formData.append("image", imageFile);

        try{
            const response = fetch(SERVER_URL + "/upload/post",{
                method: "POST",
                body: formData,
                headers:{
                    Authorization: `Bearer ${props.token}`,
                },
                
            });
            console.log("Upload post sucessfully");
            if (response) {
                window.location.reload();
            }
        }
        catch(e){
            console.log(e);
        }

    }

    return (
        <div className="itemContent">
            <div className="inputPost ">
                <img 
                    className="avatar" 
                    src={avatarImageUrl || "https://trantu1243.blob.core.windows.net/loadimage-11ee-814b-45e4577e52de/60f1fe16956559.562b39813b082.jpg"} 
                    alt="" 
                    onClick={navigateProfile}
                />
                <form className="inputPost-form">
                    <textarea 
                        ref={textareaRef} 
                        id="yourPostInput" 
                        rows="1" type="text" 
                        placeholder="What is happening?!!" 
                        name="yourPost"
                        value={yourPost}
                        onChange={handlePostInput}
                    ></textarea>
                    {checkImage && <div className="loadImage" >
                        <img src={previewImage} alt="" />

                        <div className="cancelIcon" onClick={handleImageCancel}>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="25px" height="25px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#dcdcdc" stroke="none">
                                    <path d="M2325 5109 c-1079 -100 -1982 -871 -2244 -1916 -347 -1379 478 -2768 1849 -3113 1054 -265 2155 156 2757 1055 576 860 576 1989 0 2850 -180 269 -433 522 -702 702 -483 324 -1081 476 -1660 422z m-573 -1455 c18 -9 207 -190 421 -402 l387 -386 388 386 c213 212 403 394 422 404 22 11 57 18 95 19 121 0 210 -89 210 -210 -1 -38 -8 -73 -19 -95 -10 -19 -192 -209 -404 -422 l-386 -388 386 -387 c212 -214 394 -404 404 -423 11 -22 18 -57 19 -95 0 -121 -89 -210 -210 -210 -38 1 -73 8 -95 19 -19 10 -209 192 -422 404 l-388 387 -387 -387 c-214 -212 -404 -394 -423 -404 -22 -11 -57 -18 -95 -19 -121 0 -210 89 -210 210 1 38 8 73 19 95 10 19 192 209 404 423 l386 387 -386 388 c-212 213 -394 403 -404 422 -11 22 -18 57 -19 95 0 97 58 175 153 206 37 12 114 4 154 -17z"/>
                                </g>
                            </svg>
                        </div>
                        
                    </div>}

                    <div className="yourPostLine"></div>

                    <label htmlFor="inputPostImage" className="customPostImageInput">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" fill="#00e192" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                            <path d="m16,7c0,1.105-.895,2-2,2s-2-.895-2-2,.895-2,2-2,2,.895,2,2Zm6.5,11h-1.5v-1.5c0-.828-.671-1.5-1.5-1.5s-1.5.672-1.5,1.5v1.5h-1.5c-.829,0-1.5.672-1.5,1.5s.671,1.5,1.5,1.5h1.5v1.5c0,.828.671,1.5,1.5,1.5s1.5-.672,1.5-1.5v-1.5h1.5c.829,0,1.5-.672,1.5-1.5s-.671-1.5-1.5-1.5Zm-6.5-3l-4.923-4.923c-1.423-1.423-3.731-1.423-5.154,0l-2.923,2.923v-7.5c0-1.379,1.122-2.5,2.5-2.5h10c1.378,0,2.5,1.121,2.5,2.5v6c0,.828.671,1.5,1.5,1.5s1.5-.672,1.5-1.5v-6c0-3.032-2.467-5.5-5.5-5.5H5.5C2.467,0,0,2.468,0,5.5v10c0,3.032,2.467,5.5,5.5,5.5h6c.829,0,1.5-.672,1.5-1.5v-.5c0-1.657,1.343-3,3-3v-1Z"/>
                        </svg>
                    </label>
                    <input type="file" id="inputPostImage" accept="image/*" onChange={handlePostImage} />

                    <button type="submit" onClick={handlePostSubmit} disabled={!checkInput} className={"check-button " + (checkInput ? "check-button-true" : "check-button-false")} >Post</button>
                </form>
            </div>
            
        </div>
    )
}

export default PostInput;