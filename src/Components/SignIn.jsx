import React,{useState} from "react";

function SignIn(){
    const [textInput, setInput] = useState({username:"", password:""});

    function handleChange(event){
        const {name, value} = event.target;
        setInput(preValue=>{
            return {...preValue, [name]:value}
        });
        console.log(textInput);
    }

    function onLoginSuccess(){
        console.log("Login Successfully!")
    }

    async function handleClick(event){

        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/login', {
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

    return <div className="signIn">
        <form>
            <h2>Member Login</h2>
            <input placeholder="Username" name="username" type="text" value={textInput.username} onChange={handleChange}></input>
            <input placeholder="Password" name="password" type="password" value={textInput.password} onChange={handleChange}></input>
            <button className="buttonSignIn" onClick={handleClick}>Sign In</button>
        </form>
    </div>
}

export default SignIn;