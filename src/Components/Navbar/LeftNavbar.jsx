import React, { useState, useEffect, useCallback, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../constants";
import { UserContext } from "../App";

function LeftNavbar(props){
    
    const user = useContext(UserContext);

    const navigate = useNavigate();
    function navigateHome(){
        navigate("/home");
    }

    function navigateProfile(){
        if (user) {
            navigate("/profile/" + user._id);
            window.location.reload();
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });
        }
    }

    function navigateYourSecret(){
        if (user) {
            navigate("/yoursecret");
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });
        }
    }

    function navigateSetting(){
        if (user) {
            navigate("/setting");
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });
        }
    }

    // notification

    const [checknotification, setChecknotification] = useState(true);
    const [notificationValue, setNotificationVal] = useState(0);

    const getNotification = useCallback(async ()=>{
        try{
            const response = await fetch(SERVER_URL + "/notification",{
                method: "GET",
                headers:{
                    "Authorization": `Bearer ${props.token}`,
                },
            });
            if (response){
                setNotificationVal(await response.json());
            }
        }
        catch (e){
            console.log(e);
        }
    },[props.token]);

    useEffect(()=>{
        getNotification();
    },[getNotification]);

    useEffect(()=>{
        if (notificationValue > 0)
        {
            setChecknotification(false);
        } 
        else {
            setChecknotification(true);
        }
    }, [notificationValue]);

    async function handleLogout(){
        try {
           
            localStorage.setItem("token","");
            props.setToken("");
            navigate("/");
            
        }
        catch (e) {
            console.log(e);
        }
    }

    async function navigateNotification(){
        navigate("/notification");
        
        try{
            const response = await fetch(SERVER_URL + "/notification",{
                method: "PATCH",
                headers:{
                    "Authorization": `Bearer ${props.token}`,
                },
            });
            if(response){
                getNotification();
            }
        }
        catch(e) {
            console.log(e);
        }
    }


    return(
        <div className="navbar leftNavbar">
            <div className="appName">
                <h1>Secret</h1>
            </div>
            <div>
                <ul className="listLeftNb">
                    <li className="itemLeftNb" onClick={navigateHome}>
                        <div className="insideItem">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30px" height="30px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="rgb(225, 225, 225)" stroke="none">
                                    <path d="M2443 5105 c-130 -36 -94 -3 -1246 -1153 -598 -598 -1101 -1107 -1117 -1131 -124 -185 -99 -433 59 -592 92 -91 209 -139 343 -139 l68 0 0 -800 c0 -541 4 -816 11 -852 38 -182 185 -347 367 -410 66 -23 71 -23 554 -23 476 0 487 0 514 21 15 11 37 33 48 48 21 27 21 40 26 695 l5 668 30 49 c38 61 115 110 189 119 28 4 168 5 311 3 l260 -3 53 -29 c50 -28 82 -61 113 -116 11 -21 15 -144 19 -692 5 -654 5 -667 26 -694 11 -15 33 -37 48 -48 27 -21 38 -21 514 -21 483 0 488 0 554 23 182 63 329 228 367 410 7 36 11 311 11 852 l0 800 68 0 c240 0 434 163 474 398 15 92 0 190 -43 282 -29 60 -116 150 -1118 1153 -597 598 -1107 1101 -1133 1118 -26 17 -71 40 -100 51 -70 27 -204 33 -275 13z"/>
                                </g>
                            </svg>
                            <h3>Home</h3>
                        </div>
                       
                    </li>
                    <li className="itemLeftNb" onClick={navigateNotification}>
                        <div className="insideItem">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30px" height="30px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="rgb(225, 225, 225)" stroke="none">
                                    <path d="M2393 4799 c-224 -25 -464 -106 -643 -216 -377 -232 -634 -595 -732 -1031 -20 -91 -22 -133 -28 -697 -6 -528 -9 -607 -24 -659 -24 -80 -59 -148 -156 -300 -100 -156 -114 -194 -108 -289 8 -117 68 -210 173 -265 l50 -27 1635 0 1635 0 50 27 c105 55 165 148 173 265 6 95 -8 133 -108 289 -45 70 -95 154 -111 186 -63 124 -62 117 -69 773 -7 563 -8 606 -29 697 -66 298 -202 555 -404 765 -245 254 -536 410 -872 468 -114 20 -325 27 -432 14z"/>
                                    <path d="M1785 1004 c-46 -24 -64 -44 -76 -85 -16 -52 -5 -94 43 -168 196 -300 563 -474 910 -432 296 36 542 187 704 430 43 65 49 80 49 127 0 61 -23 99 -76 126 -31 17 -89 18 -779 18 -656 0 -749 -2 -775 -16z"/>
                                </g>
                            </svg>
                            <h3>Notifications</h3>
                            { (!checknotification) && <div className="notification"><p>{notificationValue}</p></div>}
                        </div>
                        
                    </li>
                   
                    <li className="itemLeftNb" onClick={navigateProfile}>
                        <div className="insideItem">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30px" height="30px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="rgb(225, 225, 225)" stroke="none">
                                <path d="M2420 5114 c-322 -40 -591 -171 -815 -398 -199 -201 -313 -415 -372 -696 -24 -118 -24 -382 0 -500 59 -281 174 -496 372 -696 201 -203 421 -322 705 -381 117 -24 380 -24 502 0 270 54 494 174 694 372 202 199 322 421 381 705 24 118 24 382 0 500 -39 185 -110 356 -212 510 -63 95 -258 291 -351 352 -161 107 -335 180 -506 213 -81 16 -328 28 -398 19z"/>
                                <path d="M2023 2104 c-560 -68 -1065 -385 -1390 -874 -191 -286 -300 -624 -319 -985 -6 -111 -5 -124 15 -163 14 -28 34 -48 61 -62 39 -20 54 -20 2170 -20 2116 0 2131 0 2170 20 27 14 47 34 61 62 20 39 21 52 15 163 -26 493 -214 925 -556 1279 -324 335 -742 539 -1199 586 -151 15 -889 11 -1028 -6z"/>
                                </g>
                            </svg>
                            <h3>Your profile</h3>
                        </div>
                    </li>
                    <li className="itemLeftNb" onClick={navigateYourSecret}>
                        <div className="insideItem">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30px" height="30px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="rgb(225, 225, 225)" stroke="none">
                                    <path d="M1360 4278 c-18 -13 -42 -34 -52 -48 -13 -18 -55 -209 -145 -661 l-127 -637 -160 -32 c-251 -51 -615 -145 -644 -167 -50 -38 -67 -70 -67 -132 0 -73 33 -121 99 -146 54 -21 45 -22 316 48 396 102 775 170 1185 211 489 50 1098 50 1590 0 391 -39 806 -113 1185 -211 273 -70 254 -66 295 -59 48 9 112 73 121 120 17 95 -30 164 -134 196 -94 29 -441 113 -603 147 l-136 27 -126 635 c-90 454 -132 643 -145 661 -56 75 -125 87 -249 41 -43 -16 -127 -42 -188 -59 -583 -164 -1211 -147 -1787 48 -135 46 -181 50 -228 18z"/>
                                    <path d="M1274 2345 c-298 -65 -542 -320 -595 -619 -14 -86 -7 -260 16 -341 56 -206 213 -394 408 -490 212 -104 470 -102 682 5 253 127 425 397 425 668 l0 72 349 0 348 0 6 -97 c9 -167 59 -300 162 -431 224 -286 625 -375 950 -212 262 131 425 396 425 690 0 337 -211 627 -535 736 -97 32 -263 43 -371 25 -91 -16 -202 -61 -284 -116 -77 -51 -186 -162 -225 -229 l-27 -46 -448 0 -448 0 -27 46 c-39 67 -148 178 -224 228 -81 54 -173 93 -260 112 -82 17 -246 17 -327 -1z"/>
                                </g>
                            </svg>
                            <h3>Your secret</h3>
                        </div>
                        
                    </li>
                    <li className="itemLeftNb" onClick={navigateSetting}>
                        <div className="insideItem">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30px" height="30px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="rgb(225, 225, 225)" stroke="none">
                                    <path d="M1720 4806 c-214 -75 -544 -265 -665 -383 -91 -88 -110 -203 -60 -353 39 -114 42 -277 8 -385 -74 -232 -269 -397 -513 -434 -128 -20 -210 -73 -259 -169 -45 -88 -77 -380 -67 -612 12 -286 39 -386 124 -461 51 -45 94 -61 217 -84 137 -25 222 -70 325 -174 132 -134 184 -260 183 -446 0 -90 -4 -111 -39 -210 -85 -244 -40 -333 276 -543 107 -71 319 -181 438 -227 122 -47 193 -48 281 -4 39 20 75 47 99 77 116 143 195 203 329 248 247 84 514 4 685 -204 96 -116 215 -158 340 -118 98 32 315 145 450 235 171 114 258 194 287 261 37 86 37 132 1 240 -40 120 -51 268 -26 372 54 231 230 409 461 464 165 40 172 43 229 95 39 36 61 65 75 104 76 204 74 790 -3 961 -26 56 -79 115 -127 140 -17 8 -62 22 -100 30 -265 55 -451 226 -514 474 -24 91 -16 262 15 345 31 84 32 183 2 250 -29 62 -54 90 -165 176 -220 171 -563 345 -703 356 -105 9 -148 -12 -279 -136 -85 -82 -131 -116 -188 -144 -178 -88 -373 -88 -554 0 -61 30 -101 60 -189 144 -85 81 -122 110 -159 123 -67 22 -138 20 -215 -8z m1030 -1470 c208 -56 368 -170 480 -343 240 -366 133 -862 -237 -1103 -136 -89 -259 -125 -433 -125 -226 0 -408 75 -564 231 -156 156 -231 338 -231 564 0 174 36 297 125 433 120 185 307 310 525 353 85 16 257 12 335 -10z"/>
                                </g>
                            </svg>
                            <h3>Setting</h3>
                        </div>
                    </li>
                    <li className="itemLeftNb" onClick={handleLogout}>
                        <div className="insideItem">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" version="1.1" viewBox="0.00 0.00 435.00 435.00">
                                <path fill="rgb(225, 225, 225)" d="   M 332.00 368.27   L 332.00 70.70   A 0.30 0.29 0.0 0 0 331.70 70.41   L 183.27 70.41   Q 182.69 70.41 182.69 70.99   Q 182.67 102.15 182.70 133.68   C 182.71 152.59 161.57 162.56 147.26 150.34   C 141.77 145.66 139.94 139.55 139.96 132.11   Q 140.06 100.27 139.96 71.52   C 139.89 51.45 152.33 34.51 171.68 29.17   Q 177.29 27.62 188.27 27.65   Q 258.12 27.86 331.53 27.71   Q 347.82 27.68 360.17 38.33   Q 374.50 50.69 374.52 71.00   Q 374.70 219.50 374.76 368.00   C 374.77 393.15 355.64 411.74 330.53 411.74   Q 257.06 411.74 183.28 411.74   C 158.35 411.73 139.81 392.15 139.95 367.65   Q 140.12 338.88 139.92 308.47   Q 139.87 301.52 141.35 297.62   C 148.45 278.88 174.92 279.28 181.51 298.18   Q 182.82 301.94 182.77 310.49   Q 182.60 341.34 182.73 368.50   Q 182.73 369.04 183.27 369.04   L 331.23 369.04   Q 332.00 369.04 332.00 368.27   Z"/>
                                <path fill="rgb(225, 225, 225)" d="   M 138.75 198.42   Q 194.43 198.42 245.49 198.42   Q 259.61 198.41 265.68 210.05   C 271.67 221.53 265.70 235.35 253.95 239.76   Q 250.46 241.06 245.70 241.06   Q 190.78 241.05 139.10 241.04   Q 138.02 241.04 138.81 241.77   Q 141.86 244.59 144.41 247.26   C 155.11 258.47 151.46 276.68 137.02 282.22   C 128.21 285.60 119.68 283.01 113.21 276.48   Q 91.92 255.00 71.84 235.07   C 65.34 228.62 63.65 219.40 67.14 210.99   Q 68.55 207.56 74.49 201.66   Q 93.28 182.97 112.41 163.75   Q 116.89 159.25 120.70 157.58   Q 128.37 154.21 136.05 156.86   C 151.00 162.02 155.66 180.52 144.36 192.20   Q 141.56 195.09 138.57 197.95   Q 138.07 198.42 138.75 198.42   Z"/>
                            </svg>
                            <h3>Log out</h3>
                        </div>
                    </li>
                </ul>
            </div>

            


        </div>
    )
}

export default LeftNavbar