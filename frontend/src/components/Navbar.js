import React, { useState, useEffect,  } from "react";
import './Navbar.css'
import LoginForm from "./login";
import SignUp from './sign_up';
import ListCartoon from "./ListCartoon";
import { Router , Link} from "react-router-dom";

function Navbar(props)
{
    const lisCartoons = [
        {
            title: "เลือกหมวด",
            submenu: [{title: "การ์ตูน",
                    submenu: [{
                            title: "การ์ตูนแอคชั่น",
                        },
                        {
                            title: "การ์ตูนตลก",
                        },{
                            title: "การ์ตูนโรแมนซ์",
                        },{
                            title: "การ์ตูนกีฬา",
                        },{
                            title: "การ์ตูนไซไฟ",
                        },
                    ],
                },
                {
                    title: "นิยาย",
                    submenu: [{
                        title: "นิยายไซไฟ",
                    },
                    {
                        title: "นิยายสืบสวน",
                    },
                ],
                },
            ],
        }
        ];
    const [IsOpenSignIn , setIsOpenSignIn] = useState(false);
    const [IsOpenSignup , setIsOpenSignUp] = useState(false);

    let OpenSignIn = null ;
    let OpenSignUp = null ;

    if(IsOpenSignup){
        OpenSignUp = <SignUp onCloseSignUp = {() => setIsOpenSignUp(false) }/>
    }

    if(IsOpenSignIn){
        OpenSignIn = <LoginForm setToken={props.setToken} onCloseSignIn = {() => setIsOpenSignIn(false) }/>
    }

    function handleClick(event){
        event.preventDefault();
        setIsOpenSignIn(true);
    };

    return (
        <div className="navbar">
            <div className="nav_container">
                <div className="logo">
                    <Link to={"/"}>
                        <img className='App-logo' src = '/images/Khaoklong.png'></img>
                    </Link>
                </div>
                <nav className="nav">
                    <ul className="menus">
                        <img className='menu-logo' src = '/images/menu-burger.png'></img>
                        {lisCartoons.map((menu, index) => {
                            const depthLevel = 0;
                            return (
                                <ListCartoon className = "List"
                                    items={menu}
                                    key={index}
                                    depthLevel={depthLevel}
                                />
                            );
                        })}
                    </ul>
                </nav>
                <div className="App-Search">
                <form onSubmit={handleClick} className="App-Search">
                        <input
                            className='serch-input'
                            type='text'
                            placeholder="วันนี้อ่านอะไรดีจ้ะ?" 
                        />
                    </form>
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