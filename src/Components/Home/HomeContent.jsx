import React,{useEffect, useRef, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { SERVER_URL } from "../constants";

function HomeContent(props){
    const navigate = useNavigate();
    const user = useContext(UserContext);

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
                navigate("/home");
            }
        }
        catch(e){
            console.log(e);
        }

    }

    return (
        <div className="content">
            <div className="itemContent">
                <div className="inputPost ">
                    <img 
                        className="avatar" 
                        src={user.avatarImageUrl || "https://trantu1243.blob.core.windows.net/loadimage-11ee-814b-45e4577e52de/60f1fe16956559.562b39813b082.jpg"} 
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
            <div className="itemContent">
                <div className="titleContent">
                    <div className="userContent">
                        <img className="avatar" src="./avatar1.jpg" alt="" />
                        <div>
                            <p className="username">Killua Zoldyck</p>
                            <p className="postTime">8h ago</p>
                        </div>
                        
                    </div>
                </div>
                <div className="post">
                    <p >Trong những rặng núi xa xôi, gió mát lành thổi qua những tán cây xanh um. Dưới bóng rợp của những chiếc lá, tiếng hát của các loài chim hòa mình vào âm nhạc tự nhiên của thiên nhiên. Con đường nhỏ băng qua thảo nguyên xanh tươi, là nơi mà những đàn gia cầm tụ tập vui đùa.

                        Mặt trời lặn khuất sau những đỉnh núi, để lại bức tranh hoàng hôn tuyệt vời. Bầu trời chuyển từ màu xanh dịu dàng sang gam màu cam và hồng, tô điểm cho không gian vô cùng huyền bí. Ánh đèn từ những ngôi làng nhỏ bắt đầu nhấp nhô lên, tô điểm thêm vẻ ấm áp và yên bình của cảnh đêm.
                        
                        Mỗi bước chân in dấu trên đường mòn nhỏ, như là những dấu vết của cuộc phiêu lưu đang diễn ra. Cảm giác tự do như là một làn gió nhẹ, đưa ta đi khắp những vùng đất mới, để khám phá những điều kỳ diệu và bí ẩn của thế giới này.</p>
                </div>
                <div className="action">
                    <div className="itemAction heart">
                        <svg fill="rgb(207, 207, 207)" height="30px" width="30px" version="1.1">
                            <g>
                                <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z">
                                </path>
                            </g>
                        </svg>
                        <p>123</p>
                    </div>
                    <div className="itemAction comment">
                        <svg fill="rgb(207, 207, 207)" height="30px" width="30px" version="1.1">
                            <g>
                                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z">
                                </path>
                            </g>
                        </svg>
                        <p>123</p>
                    </div>
                    <div className="itemAction repost">
                        <svg fill="rgb(207, 207, 207)" height="30px" width="30px" version="1.1">
                            <g>
                                <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z">
                                </path>
                            </g>
                        </svg>
                        <p>123</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default HomeContent;