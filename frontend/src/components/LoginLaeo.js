import React, { useState, useEffect,  } from "react";
import './LoginLaeo.css'



function LoginLaeo()
{  
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
                <div className="App-search">
                    <input
                        className='serch-input'
                        type='text'
                        placeholder="วันนี้อ่านอะไรดีจ้ะ?" 
                    />
                </div>
                <div className="love"> 
                <button className="buttonLove">
                        <img src="images/heart.png" alt="Button Image" />
                 </button>
                </div>
                <div className="basket"> 
                    <button className="buttonCart">
                        <img src='/images/cart.png' alt="Button Image" />
                    </button>
                </div>
                <div className="profile"> 
                    <button className="buttonProfile">
                        <img src='/images/profile.png' alt="Button Image" />
                    </button>
                </div>
            </div>
        </div>
    );

}

export default LoginLaeo;
