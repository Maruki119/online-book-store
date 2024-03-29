import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Promote2 from "./components/Promote2"
import ShowMore_Product from "./components/ShowMore_Product";
import Footer from "./components/Footer";
function HomePage(props)
{

    let login = false;

    return (
        <div className="homepage-contrainer">
            <Navbar setToken={props.setToken}/>
            <Promote2/>
            <ShowMore_Product login = {login}/>
            <Footer/>
        </div>

    );

}

export default HomePage;