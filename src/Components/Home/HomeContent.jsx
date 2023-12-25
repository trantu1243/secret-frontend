import React,{useEffect, useRef} from "react";

function HomeContent(){
    const textareaRef = useRef(null);
    useEffect(() => {
        const textarea = textareaRef.current;
    
        const handleTextareaInput = () => {
          textarea.style.height = "auto";
          textarea.style.height = (textarea.scrollHeight) + "px";
        };
    
        if (textarea) {
          textarea.addEventListener("input", handleTextareaInput);
    
          // Clean up the event listener when the component unmounts
          return () => {
            textarea.removeEventListener("input", handleTextareaInput);
          };
        }
      }, [textareaRef]);
    return (
        <div className="content">
            <div className="itemContent">
                <div className="inputPost ">
                    <img className="avatar" src="./avatar2.jpg" alt="" />
                <form>
                    <textarea ref={textareaRef} id="yourPostInput" rows="1" type="text" placeholder="What is happening?!!" name="yourPost"></textarea>
                    <div className="yourPostLine"></div>
                    <button type="submit">Post</button>
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