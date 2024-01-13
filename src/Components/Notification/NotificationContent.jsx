import React, {useContext, useState, useEffect} from "react";
import { UserContext } from "../App";
import NotificationItem from "./NotificationItem";

function NotificationContent(){
    const user = useContext(UserContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(()=>{
        if (user) {
            setNotifications(user.notification);
        }
    }, [user]);

    

    return (
        <div className="content">
            <div className="notifications">
                {notifications.map((notification, index)=>(
                    <NotificationItem key={index} notification={notification} />
                ))}
            </div>
        </div>
    )
}

export default NotificationContent;