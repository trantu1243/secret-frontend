import React, {useEffect, useCallback, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../constants";


function RightNavbar(props){
    const navigate = useNavigate();

    const [userList, setUserList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    
    const getUserList = useCallback(async ()=>{
        try{
            const response = await axios.get(SERVER_URL + "/userList", {
                headers:{
                    Authorization: `Bearer ${props.token}`,
                }
            })

            if (response.data){
                setUserList(response.data.userList.slice(0, 8));
            }
        }
        catch(e) {

        }
    }, [props.token]);


    function navigateUserProfile(id){
        navigate("/profile/" + id);
        window.location.reload();
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }

    // handle search

    const search = useCallback(async ()=>{
        try{
            const response = await axios.get(SERVER_URL + "/search/user", {
                params:{name:`${searchInput}`},
            });

            if (response.data){
                setUserList(response.data.userList.slice(0, 8));
            }
        }
        catch(e) {

        }
    },[searchInput]);

    function handleSearchInput(e){
        const {value} = e.target;
        setSearchInput(value);
    };

    useEffect(()=>{
        if (searchInput === "") getUserList();
        else {
            search();
        }
    }, [getUserList, searchInput, search]);

    return(
        <div className="navbar rightNavbar">
            <div className="search-bar">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="22px" height="22px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="rgb(190, 190, 190)" stroke="none">
                            <path d="M1940 5079 c-493 -25 -971 -242 -1334 -605 -295 -295 -496 -674 -570 -1075 -168 -910 277 -1807 1104 -2228 454 -231 994 -284 1489 -145 177 50 429 163 557 252 l59 40 605 -602 c546 -545 611 -606 670 -635 305 -147 651 109 591 437 -24 130 -23 129 -680 786 l-608 608 82 161 c138 272 201 499 226 802 44 550 -154 1119 -535 1533 -193 211 -404 365 -661 484 -154 71 -211 92 -354 128 -214 54 -401 71 -641 59z m355 -684 c555 -91 1005 -512 1133 -1060 108 -461 -25 -943 -353 -1284 -270 -280 -622 -431 -1007 -431 -371 0 -721 146 -987 411 -196 197 -323 433 -383 712 -31 146 -31 399 1 546 82 384 296 696 621 906 166 108 344 172 570 208 66 11 323 6 405 -8z"/>
                        </g>
                    </svg>
                    
                </div>
                <input type="text" name="search" placeholder="Search" value={searchInput} onChange={handleSearchInput} autoComplete="off"></input>
            </div>
            {(userList.length === 0 ) && <div className="no-match"><p>No match</p></div>}
            <div className="user-list">
                
                {userList.map((user)=>(
                    <div key={user._id} className="user-item" onClick={()=>{return navigateUserProfile(user._id)}}>
                        <img 
                            className="avatar" 
                            src={user.avatarImageUrl || "https://trantu1243.blob.core.windows.net/loadimage-11ee-814b-45e4577e52de/60f1fe16956559.562b39813b082.jpg"} 
                            alt="" 

                        />
                        <p>{user.firstName + " " + user.lastName}</p>
                    </div>
                ))}
                
                
            </div>
            
        </div>
    )
}

export default RightNavbar


// <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" class="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq" style="--color:var(--secondary-icon)"><g fill-rule="evenodd" transform="translate(-448 -544)"><g fill-rule="nonzero"><path d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z" transform="translate(448 544)"></path><path d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z" transform="translate(448 544)"></path><path d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z" transform="translate(448 544)"></path><path d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z" transform="translate(448 544)"></path></g></g></svg>