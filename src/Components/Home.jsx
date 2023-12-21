import React from "react";
import LogOut from "./LogOut";
import { useNavigate } from "react-router-dom";


function Home(props){
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!props.isLogin) {
          navigate('/');
        }
      }, [props.isLogin, navigate]);
    return (
       <div>
            <h1>Successful login</h1>
            <LogOut isLogin={props.isLogin} setCheckLogin={props.setCheckLogin} />
       </div>
    )
}

export default Home;