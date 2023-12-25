import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../constants";
import axios from "axios";

function SignUp(props){
    const [textInput, setInput] = useState({
        firstName:"",
        lastName:"",
        username:"", 
        password:"", 
        confirmPassword:""
    });
    const [checkPass, setCheckPass] = useState(true);
    const [checkUser, setCheckUser] = useState(false);
    const navigate = useNavigate();
    function handleChange(event){
        const {name, value} = event.target;
        setInput(preValue=>{
            return {...preValue, [name]:value}
        });
    }

    

    async function handleClick(event){

        event.preventDefault();

        if(textInput.password !== textInput.confirmPassword){
            setCheckPass(false);
        } 
        else{
            try {
                const response = await axios.post(SERVER_URL + "/register", textInput);
          
                if (response.data.token) {
                    console.log(response.data);
                    // Save new token to localStorage
                    const newToken = response.data.token;
                    localStorage.setItem("token", newToken);
                    props.setToken(newToken);
                } else if (response.data.error){
                    console.log(response.data.error);
                    setCheckUser(true);
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        }

        
    }

    function navigateLogin(event){
        event.preventDefault();
        navigate("/login");
    }

    return <div className="signIn">
        <form className="userForm">
            <h2>Member Register</h2>
            <input style={{width:"220px",marginRight:"20px"}} placeholder="First name" name="firstName" type="text" value={textInput.firstName} onChange={handleChange}></input>
            <input style={{width:"220px"}} placeholder="Last name" name="lastName" type="text" value={textInput.lastName} onChange={handleChange} ></input>
            <input placeholder="Username" name="username" type="text" value={textInput.username} onChange={handleChange}></input>
            {checkUser && <p style={{color:"red",margin:"0",padding:"0"}}>Username already exists. Please choose another username.</p>}
            <input placeholder="Password" name="password" type="password" value={textInput.password} onChange={handleChange}></input>
            <input placeholder="Password" name="confirmPassword" type="password" value={textInput.confirmPassword} onChange={handleChange}></input>
            {!checkPass && <p style={{color:"red",margin:"0",padding:"0"}}>Passwords do not match</p>}
            <button className="buttonSignIn" onClick={handleClick}>Sign Up</button>
            <div className="line"></div>
            <button className="buttonSignUp" onClick={navigateLogin}>Login</button>
        </form>
    </div>
}

export default SignUp;