import React, { useState, useEffect,  } from "react";
import axios from "axios";
import './Navbar_Login.css'
import './profileView.css'
import useToken from './useToken';
import ListCartoon from "./ListCartoon";
import { Link } from "react-router-dom";

function LoginLaeo(props){

  const lisCartoons = [
    {
        title: "หมวดหมู่",
        
        submenu: [
            
            {title: "ทั้งหมด" 
            },
            {title: "การ์ตูน",
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
    const { removeToken } = useToken();
    const [search, setSearch] = useState();

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
                book_access: res.book_access,
                cart: res.cart,
                wishlist: res.wishlist
            }))
         }).catch ((error) => {
                if(error.response){
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }

    function handleLogout(){
        axios.post("http://127.0.0.1:5000/logout")
        .then((response) => {
            removeToken();
            console.log(response.data);
            window.location.reload();
        }).catch ((error) => {
            if(error.response){
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
    };

    function handleSearch(event){
        event.preventDefault();
        axios.get("http://127.0.0.1:5000/search", {
            params: {
                title: search
            }
        })
        .then((response) => {
            console.log("Search Results: ", response.data);
        }).catch((error) => {
            console.error("Search Error: ", error);
        });
    }

    function handleSearchInput(event){
        setSearch(event.target.value);
    }


    const toggleDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown);
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
                <div className="App-search">
                    <form onSubmit={handleSearch} className="App-search">
                        <input
                            className='serch-input'
                            type='text'
                            placeholder="วันนี้อ่านอะไรดีจ้ะ?" 
                            value={search}
                            onChange={handleSearchInput}
                        />
                    </form>
                </div>
                <div className="love"> 
                    <Link to={"/wishlist"}>
                    <button className="buttonLove">
                        <img src="/images/heart.png" alt="Love" />
                    </button>
                    </Link>
                </div>
                <div className="basket"> 
                    <Link to={"/checkout"}>
                    <button className="buttonCart">
                        <img src='/images/cart.png' alt="Cart" />
                    </button>
                    </Link>
                </div>
                <div className="profile">
                    <button className="buttonProfile" onClick = {toggleDropdown}>
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
                                        <Link to="/topup">
                                            <div className="item">
                                                <p><span role="img" aria-label="coin">💰</span> {profileData.balance}</p>
                                            </div>
                                        </Link>
                                        <Link to="/libary">
                                            <div className="item">
                                                <span> ชั้นหนังสือ</span>
                                            </div>
                                        </Link>
                                        <Link to="/setting">
                                            <div className="item">
                                                <p>ตั้งค่าบัญชี</p>
                                            </div>
                                        </Link>
                                        <Link to="/">
                                            <div className="item logout" onClick = {handleLogout}>
                                                <p>ออกจากระบบ</p>
                                            </div>
                                        </Link>
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
