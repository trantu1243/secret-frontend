import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../Navbar/TopNavbar";
import LeftNavbar from "../Navbar/LeftNavbar";
import RightNavbar from "../Navbar/RightNavbar";
import { SERVER_URL } from "../constants";


function ChangePass(props){
    const navigate = useNavigate();
   
    useEffect (()=>{
        if (!props.token) {
            navigate("/");
        }
    }, [navigate, props.token]);

    const [textInput, setInput] = useState({
        password:"", 
        newPassword:"",
        confirmPassword:""
    });
    const [checkPass, setCheckPass] = useState(true);
    const [checkPassword, setCheckPassword] = useState(true);
    const [checkSuccess, setCheckSuccess] = useState(false);
    const [checkLength, setCheckLength] = useState(true);

    function handleChange(event){
        const {name, value} = event.target;
        setInput(preValue=>{
            return {...preValue, [name]:value}
        });
    }

    async function handleClick(event){

        event.preventDefault();
        if (textInput.newPassword.length < 8 || textInput.newPassword.length >32) {
            setCheckLength(false);
            setCheckSuccess(false);
        } else if(textInput.newPassword !== textInput.confirmPassword){
            setCheckPass(false);
            setCheckSuccess(false);
        } else{
            setCheckPass(true);
            const formData = new URLSearchParams();
            formData.append("password", textInput.password);
            formData.append("newPassword", textInput.newPassword);
            formData.append("confirmPassword", textInput.confirmPassword);
            try {
                
                const response = await fetch(SERVER_URL + "/changepassword",{
                    method: "PATCH",
                    body: formData,
                    headers:{
                        Authorization: `Bearer ${props.token}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    
                });
                if (response.ok) {
                    console.log("Change password sucessfully");
                    setCheckSuccess(true);
                    setCheckPassword(true);
                    setCheckLength(true);
                } else{
                    setCheckPassword(false);
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
                <form className="change-pass-form">
                    <label htmlFor="password">Password:</label>
                    <input 
                        id="password" 
                        type="password" 
                        name="password" 
                        value={textInput.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="newPassword">New password:</label>
                    <input 
                        id="newPassword" 
                        type="password" 
                        name="newPassword" 
                        value={textInput.newPassword}
                        onChange={handleChange}
                    />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input 
                        style={{marginBottom:"0"}}
                        id="confirmPassword"
                        type="password" 
                        name="confirmPassword" 
                        value={textInput.confirmPassword}
                        onChange={handleChange}
                    />
                    {!checkPass && <p style={{color:"red",margin:"0",padding:"0",fontSize:"13px"}}>Passwords do not match</p>}
                    {!checkPassword && <p style={{color:"red",margin:"0",padding:"0",fontSize:"13px"}}>Password is incorrect</p>}
                    {!checkLength && <p style={{color:"red",margin:"0",padding:"0",fontSize:"13px"}}>Password must be 8-32 characters</p>}
                    {checkSuccess && <p style={{color:"rgb(0, 255, 0)",margin:"0",padding:"0",fontSize:"13px"}}>Change password successfully</p>}
                    <button type="submit" className="change-pass-button" onClick={handleClick}>Change</button>
                </form>
               
            </div>
        </div>
    )
}

export default ChangePass;