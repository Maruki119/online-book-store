import React, { useState, useEffect,  } from "react";
import axios from "axios";
import './Navbar_Login.css'
import './profileView.css'
import useToken from './useToken';
import ListCartoon from "./ListCartoon";

function LoginLaeo(props){

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
    
    const [profileData, setProfileData] = useState(null)
    const [isOpenDropdown,setIsOpenDropdown] = useState(false)
    const [isUsageOpen, setIsUsageOpen] = useState(false);
    const { token, removeToken, setToken } = useToken();

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
    
    const toggleDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown);
    };

    const toggleUsage = () => {
        setIsUsageOpen(!isUsageOpen);
        
    };

    const handleLogout = () => {
        removeToken();
        window.location.reload();
    };

    return (
        <div className="navbar">
            <div className="nav_container">
                <div className="logo">
                    <img className='App-logo' src = '/images/Khaoklong.png'></img>
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
                    <button className="buttonProfile" onDoubleClick = {toggleDropdown}>
                        <img src='/images/profile.png' alt="Profile" />
                        {isOpenDropdown && (
                            <div className="frame">
                            <div className="container">
                              <div className="header">
                                <img
                                  className="avatar"
                                  src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                  alt="Avatar"
                                />
                                <p className="userName">{profileData.user}</p>
                              </div>
                      
                              <div className="items">
                                <div className="item">
                                  <p><span role="img" aria-label="coin">💰</span> ยอดเงินคงเหลือ</p>
                                </div>
                                <div className="item" onClick={toggleUsage}>
                                  <p>การใช้งาน</p>
                                  {isUsageOpen && (
                                    <ul className="submenu">
                                      <li>ชั้นหนังสือ</li>
                                      <li>ประวัติการซื้อ</li>
                                    </ul>
                                  )}
                                </div>
                                <div className="item">
                                  <p>ตั้งค่าบัญชี</p>
                                </div>
                                <div className="item logout" onClick = {handleLogout}>
                                  <p>ออกจากระบบ</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

}

export default LoginLaeo;
