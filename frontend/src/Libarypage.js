import React, { useState, useEffect } from "react";
import Profile from "./components/Navbar_Login";
import useToken from './components/useToken'
import Footer from "./components/Footer";
import Libary from "./components/Libary";
function LibaryPage()
{
    const { token, removeToken, setToken } = useToken();

    return (
        <div className="wishlist-contrainer">
            <Profile token={token} removeToken = {removeToken} setToken={setToken}/>
            <Libary/>
            
            <Footer/>
        </div>

    );

}

export default LibaryPage;
