import React, { useState, useEffect,  } from "react";
import './Navbar.css'
import LoginForm from "./login";
import SignUp from './sign_up';


function Navbar()
{
    const [IsOpenSignIn , setIsOpenSignIn] = useState(false);
    const [IsOpenSignup , setIsOpenSignUp] = useState(false);

    let OpenSignIn = null ;
    let OpenSignUp = null ;
    if(IsOpenSignup){
        OpenSignUp = <SignUp onCloseSignUp = {() => setIsOpenSignUp(false) }/>
    }

    if(IsOpenSignIn){
        OpenSignIn = <LoginForm onCloseSignIn = {() => setIsOpenSignIn(false) }/>
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
                <div className="App-search">
                    <input
                        className='serch-input'
                        type='text'
                        placeholder="วันนี้อ่านอะไรดีจ้ะ?" 
                    />
                </div>
                <div className = "Sign-in">
                        <button className="sign-in-button" onClick={() => setIsOpenSignIn(true)}>เข้าสู่ระบบ</button>
                        {OpenSignIn}
                </div>

                <div className = "Sign-up">
                        <button className="sign-up-button" onClick={() => setIsOpenSignUp(true)}>สมัครสมาชิก</button>
                        {OpenSignUp}
                </div>
            </div>
        </div>
    );

}

export default Navbar;
