import React, { useState, useEffect } from "react";
import Profile from "./components/Navbar_Login";
import useToken from './components/useToken'
import Footer from "./components/Footer";
import Topup from "./components/Topup";
function Topuppage()
{
    const { token, removeToken, setToken } = useToken();

    return (
        <div className="topup-contrainer">
            <Profile token={token} removeToken = {removeToken} setToken={setToken}/>
            <Topup/>

            <Footer/>
        </div>

    );

}

export default Topuppage;