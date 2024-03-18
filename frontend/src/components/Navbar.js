import React, { useState, useEffect } from "react";
import './Navbar.css'


function Navbar()
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
                <div className = "Sign-in">
                        <button className="sign-in-button">เข้าสู่ระบบ</button>
                        
                </div>
                    

                <div className = "Sign-up">
                        <button className="sign-up-button">สมัครสมาชิก</button>
                        
                </div>

            </div>
        </div>
    );

}

export default Navbar;
