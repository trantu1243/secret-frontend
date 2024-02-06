import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../constants";
import axios from "axios";

function SignIn(props){
    

    const [textInput, setInput] = useState({username:"", password:""});
    const [checkUser, setCheckUser] = useState(true);
    const navigate = useNavigate();

    function handleChange(event){
        const {name, value} = event.target;
        setInput(preValue=>{
            return {...preValue, [name]:value}
        });
    }

    async function handleClick(event){

        event.preventDefault();

        try {
            
            const response = await axios.post(SERVER_URL + "/login", textInput);
      
            if (response.data) {
                console.log(response.data);

                // Save new token to localStorage
                const newToken = response.data.token;
                localStorage.setItem("token", newToken);
                props.setToken(newToken);

            } else {
                console.log('Login failed');
                
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setCheckUser(false);
        }
    }

    function createAccount(event){
        event.preventDefault();
        navigate("/register");
    }

    return <div className="signIn">
        <form className="userForm">
            <h2>Member Login</h2>
            <input placeholder="Username" name="username" type="text" value={textInput.username} onChange={handleChange}></input>
            <input placeholder="Password" name="password" type="password" value={textInput.password} onChange={handleChange}></input>
            {!checkUser && <p style={{color:"red",margin:"0",padding:"0",width:"100%", textAlign:"left", paddingLeft:"10px"}}>Username or password is incorrect</p>}
            <button type="submit" className="buttonSignIn" onClick={handleClick}>Sign In</button>
            <div className="line"></div>
            
            <button type="submit" className="buttonSignUp" onClick={createAccount}>Create account</button>
        </form>
    </div>
}

export default SignIn;