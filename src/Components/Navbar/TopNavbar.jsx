import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";

function TopNavbar(){
    const navigate = useNavigate();
    const [checkTop, setCheckTop] = useState(true);
    const [checkHome, setCheckHome] = useState(true);

    const location = useLocation();
    const currentLocation = location.pathname;

    useEffect(()=>{
        if (currentLocation === "/home" || currentLocation === "/secret") setCheckTop(true);
        else setCheckTop(false);

        if (currentLocation === "/home") setCheckHome(true);
        else setCheckHome(false);
    },[currentLocation]);

    function navigateSecret(){
        if (checkHome){
          
            navigate("/secret");
        }
    }

    function navigateHome(){
        if (!checkHome){
       
            navigate("/home");
        }
    }

    function navigateHomeFrom(){
        navigate("/home");
    }

    return(
        <div className="navbar topNavbar">
            {checkTop ? <div className="top-container">
                <div className="topItem" onClick={navigateHome}>
                    <p>Following</p>
                    {checkHome && <div className="underline-top"></div>}
                </div>
                <div className="topItem" onClick={navigateSecret}>
                    <p>Secret</p>
                    {(!checkHome) && <div className="underline-top"></div>}
                </div>
            </div>
            :<div className="return-button" onClick={navigateHomeFrom}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30px" height="30px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="rgb(225, 225, 225)" stroke="none">
                    <path d="M2005 4457 c-105 -35 -121 -50 -922 -850 -740 -740 -794 -796 -823 -858 -60 -129 -60 -249 0 -378 29 -62 83 -118 828 -863 739 -739 802 -799 862 -827 169 -79 361 -47 489 80 125 126 158 314 84 483 -24 55 -67 102 -437 474 l-410 412 1404 0 c854 0 1428 4 1464 10 184 30 327 174 357 359 36 224 -127 444 -357 481 -36 6 -610 10 -1464 10 l-1404 0 405 408 c480 482 464 460 464 652 0 111 -1 118 -34 182 -41 83 -129 169 -208 205 -48 22 -76 27 -158 30 -64 2 -114 -2 -140 -10z"/>
                    </g>
                </svg>
            </div>
            }
            
        </div>
    )
}

export default TopNavbar;