import React, { useState, useEffect } from "react";
import Profile from "./components/Navbar_Login";
import Promote from "./components/Promote"
import ShowMore_Product from "./components/ShowMore_Product";
import useToken from './components/useToken'

function HomePage_Login()
{
    const { token, removeToken, setToken } = useToken();

    return (
        <div className="homepage-contrainer">
            <Profile token={token} removeToken = {removeToken} setToken={setToken}/>
            <Promote/>
            <ShowMore_Product/>
        </div>

    );

}

export default HomePage_Login;