import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Promote from "./components/Promote"

function HomePage(props)
{


    return (
        <div className="homepage-contrainer">
            <Navbar setToken={props.setToken}/>
            <Promote/>
        </div>

    );

}

export default HomePage;