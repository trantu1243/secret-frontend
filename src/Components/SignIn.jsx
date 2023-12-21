import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "./constants";

function SignIn(props){
    const [textInput, setInput] = useState({username:"", password:""});
    const navigate = useNavigate();
    function handleChange(event){
        const {name, value} = event.target;
        setInput(preValue=>{
            return {...preValue, [name]:value}
        });
    }

    function onLoginSuccess(){
        console.log("Login Successfully!");
        props.setCheckLogin(true);
        navigate("/home");
    }

    async function handleClick(event){

        event.preventDefault();

        try {
            const response = await fetch(SERVER_URL + "/login", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(textInput),
            });
      
            if (response.ok) {
              console.log(response);
              onLoginSuccess();
            } else {
              console.error('Login failed');
            }
          } catch (error) {
            console.error('Error logging in:', error);
          }
    }

    function createAccount(event){
      event.preventDefault();
      navigate("/register");
    }

    return <div className="signIn">
        <form>
            <h2>Member Login</h2>
            <input placeholder="Username" name="username" type="text" value={textInput.username} onChange={handleChange}></input>
            <input placeholder="Password" name="password" type="password" value={textInput.password} onChange={handleChange}></input>
            <button className="buttonSignIn" onClick={handleClick}>Sign In</button>
            <div className="line"></div>
            <button className="buttonSignUp" onClick={createAccount}>Create account</button>
        </form>
    </div>
}

export default SignIn;