import React, {useEffect, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../Navbar/TopNavbar";
import LeftNavbar from "../Navbar/LeftNavbar";
import RightNavbar from "../Navbar/RightNavbar";
import { UserContext } from "../App";
import { SERVER_URL } from "../constants";

function EditProfile(props){
    const navigate = useNavigate();

    useEffect (()=>{
        if (!props.token) {
            navigate("/");
        }
    }, [navigate, props.token]);


    const user = useContext(UserContext);
    const [userInfor, setUserInfor] = useState({
        username:"",
        firstName:"",
        lastName:"",
    });

    useEffect(()=>{
        if (user) {
            setUserInfor({
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName,
            });
        }
    }, [user]);
   
    const [checkName, setCheckName] = useState(true);
    const [checkSuccess, setCheckSuccess] = useState(false);

    function handleChange(event){
        const {name, value} = event.target;
        setUserInfor(preValue=>{
            return {...preValue, [name]:value}
        });
    }

    async function handleClick(event){
        event.preventDefault();
        const regex = /[\W\d\s]/;
        if((!userInfor.firstName && !userInfor.lastName) || regex.test(userInfor.firstName) || regex.test(userInfor.lastName)){
            setCheckName(false);
            setCheckSuccess(false);
       
        } else {
            setCheckName(true);
            const formData = new URLSearchParams();
            formData.append("firstName", userInfor.firstName);
            formData.append("lastName", userInfor.lastName);
            try {
                
                const response = await fetch(SERVER_URL + "/editprofile",{
                    method: "PATCH",
                    body: formData,
                    headers:{
                        Authorization: `Bearer ${props.token}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    
                });
                if (response.ok) {
                    setCheckSuccess(true);
                }

            } catch (error) {
                console.error('Error logging in:', error);
            }
        }
       
    }

    return (
        <div className="home">
            <LeftNavbar token={props.token} setToken={props.setToken} />
            <TopNavbar  />
            <RightNavbar token={props.token} setToken={props.setToken} />

            <div className="content">
                <form className="editpr-form">
                    <div className="username-item">
                        <label htmlFor="username">Username:</label>
                            <input 
                                id="username" 
                                type="text" 
                                name="username"
                                disabled 
                                value={userInfor.username}
                                // onChange={}
                            />
                    </div>
                    <div className="name-farth">
                        <div className="name-item firtname-item">
                            <label htmlFor="first-name">First name:</label>
                                <input 
                                    id="first-name" 
                                    type="text" 
                                    name="firstName" 
                                    value={userInfor.firstName}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                        </div>
                        <div className="name-item lastname-item">
                            <label htmlFor="last-name">Last name:</label>
                                <input 
                                    id="last-name" 
                                    type="text" 
                                    name="lastName" 
                                    value={userInfor.lastName}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                        </div>
                    </div>
                    
                    {!checkName && <p style={{color:"red",margin:"0",padding:"0"}}>Your name is invalid</p>}
                    {checkSuccess && <p style={{color:"rgb(0, 255, 0)",margin:"0",padding:"0"}}>Edit profile successfully</p>}
                    <button type="submit" className="change-pass-button" onClick={handleClick}>Save</button>
                    
                </form>
               
            </div>
        </div>
    )
}

export default EditProfile;