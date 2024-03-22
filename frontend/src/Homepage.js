import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

function HomePage(props)
{


    return (
        <div className="homepage-contrainer">
            <Navbar setToken={props.setToken}/>
        </div>

    );

}

export default HomePage;