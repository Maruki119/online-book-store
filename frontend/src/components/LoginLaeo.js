import React, { useState, useEffect,  } from "react";
import axios from "axios";
import './LoginLaeo.css'

function LoginLaeo(props){
    
    const [profileData, setProfileData] = useState(null)

    useEffect(() => {
        getData();
    }, []);
    
    function getData(){
        axios.get("http://127.0.0.1:5000/profile", {
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then((response) => {
            const res = response.data
            res.access_token && props.setToken(res.access_token)
            setProfileData(({
                _id: res._id,
                user: res.user,
                email: res.email,
                fullname: res.fullname,
                password: res.password,
                card_id: res.card_id,
                balance: res.balance,
                book_access: res.book_access
            }))
         }).catch ((error) => {
                if(error.response){
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }
    
    return (
        <div className="navbar">
            <div className="nav_container">
                <div className="logo">
                    <img className='App-logo' src = '/images/Khaoklong.png'></img>
                </div>
                <div className="menu">
                    <img className='App-menu' src = '/images/menu-burger.png'></img>
                </div>
                
            
                <h1>เลือกหมวด</h1>
                <h1></h1>
                <div className="App-search">
                    <input
                        className='serch-input'
                        type='text'
                        placeholder="วันนี้อ่านอะไรดีจ้ะ?" 
                    />
                </div>
                <div className="love"> 
                <button className="buttonLove">
                        <img src="images/heart.png" alt="Love" />
                 </button>
                </div>
                <div className="basket"> 
                    <button className="buttonCart">
                        <img src='/images/cart.png' alt="Cart" />
                    </button>
                </div>
                <div className="profile"> 
                    <button className="buttonProfile">
                        <img src='/images/profile.png' alt="Profile" />
                    </button>
                    {profileData && (
                        <div className="profileData">
                            <p>User: {profileData.user}</p>
                            <p>Email: {profileData.email}</p>
                            <p>Fullname: {profileData.fullname}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}

export default LoginLaeo;
