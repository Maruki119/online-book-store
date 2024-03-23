import React, { useState, useEffect,  } from "react";
import './Navbar.css'
import LoginForm from "./login";
import SignUp from './sign_up';
import ListCartoon from "./ListCartoon";
import { lisCartoons } from "./listCartoons";


function Navbar(props)
{
    const Menu1 = ['นิยาย','การ์ตูน']
    const [IsOpenSignIn , setIsOpenSignIn] = useState(false);
    const [IsOpenSignup , setIsOpenSignUp] = useState(false);
    const [OpenMenu1 , setOpenMenu1] = useState(false);

    let OpenSignIn = null ;
    let OpenSignUp = null ;

    if(IsOpenSignup){
        OpenSignUp = <SignUp onCloseSignUp = {() => setIsOpenSignUp(false) }/>
    }

    if(IsOpenSignIn){
        OpenSignIn = <LoginForm setToken={props.setToken} onCloseSignIn = {() => setIsOpenSignIn(false) }/>
    }

    return (
        <div className="navbar">
            <div className="nav_container">
                <div className="logo">
                    <img className='App-logo' src = '/images/Khaoklong.png'></img>
                </div>
                <nav>
                    <ul className="menus">
                    <img className='App-logo' src = '/images/menu-burger.png'></img>
                        {lisCartoons.map((menu, index) => {
                            const depthLevel = 0;
                            return (
                                <ListCartoon
                                    items={menu}
                                    key={index}
                                    depthLevel={depthLevel}
                                />
                            );
                        })}
                    </ul>
                </nav>
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

            <div className="List_container">

            </div>
        </div>
    );

}

export default Navbar;