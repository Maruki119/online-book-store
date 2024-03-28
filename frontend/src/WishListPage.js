import React, { useState, useEffect } from "react";
import Profile from "./components/Navbar_Login";
import useToken from './components/useToken'
import Footer from "./components/Footer";
import WishList from "./components/wishlist";
function WishListPage()
{
    const { token, removeToken, setToken } = useToken();

    return (
        <div className="wishlist-contrainer">
            <Profile token={token} removeToken = {removeToken} setToken={setToken}/>
            <WishList/>
            
            <Footer/>
        </div>

    );

}

export default WishListPage;