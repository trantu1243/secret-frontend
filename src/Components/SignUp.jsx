import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "./constants";

function SignUp(props){
    const [textInput, setInput] = useState({username:"", password:"", confirmPassword:""});
    const [checkPass, setCheckPass] = useState(true);
    const navigate = useNavigate();
    function handleChange(event){
        const {name, value} = event.target;
        setInput(preValue=>{
            return {...preValue, [name]:value}
        });
    }

    function onRegisterSuccess(){
        console.log("Sign up Success!");
        props.setCheckLogin(true);
        navigate("/home");
    }

    async function handleClick(event){

        event.preventDefault();

        if(textInput.password !== textInput.confirmPassword){
            setCheckPass(false);
        } 
        else{
            try {
                const response = await fetch(SERVER_URL + "/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(textInput),
                });
          
                if (response.ok) {
                    console.log(response);
                    onRegisterSuccess();
                } else {
                    console.error('Login failed');
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
        <form>
            <h2>Member Register</h2>
            <input placeholder="Username" name="username" type="text" value={textInput.username} onChange={handleChange}></input>
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