import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function NotificationItem(props){
    const navigate = useNavigate();
    const [notification, setNotification] = useState({
        postId:"",
        avatarImageUrl:"",
        name:"",
        content:"",
        date:null
    });

    useEffect(()=>{
        setNotification(props.notification);
    },[props.notification]);

    function navigatePost(){
        navigate("/post/" + notification.postId);
    }

    // handle notification date
    const [timeFromNow, setTimeFromNow] = useState("");
    useEffect(()=>{
        if(notification.date){
            const now = moment();
            const postDate = moment(notification.date);

            const minutesAgo = now.diff(postDate,"minutes");
            const hourAgo = now.diff(postDate, "hours");
            const dayAgo = now.diff(postDate, "days");

            if (minutesAgo < 60){
                setTimeFromNow(moment.duration(minutesAgo, "minutes").humanize());
            } 
            else  if(hourAgo < 24){
                setTimeFromNow(moment.duration(hourAgo, "hours").humanize());
            }
            else if(dayAgo < 7){
                setTimeFromNow(moment.duration(dayAgo,"days").humanize());
            }
            else{
                setTimeFromNow(postDate.format("MMMM Do YYYY"));
            }
        };
    },[notification]);

    return (
        <div className="notification-item" onClick={navigatePost}>
            <div className="notification-content">
                <img className="notification-user-img" alt="" src={notification.avatarImageUrl || "secret-frontend/src/Components/Post/InsidePost.jsx"} />
                <div>
                    <p className="notification-content"><span className="notification-username">{notification.name}&nbsp;</span>{notification.content}</p>
                    <p className="notification-time">{timeFromNow}</p>
                </div>
                
            </div>
            
        </div>
    )
}

export default NotificationItem;