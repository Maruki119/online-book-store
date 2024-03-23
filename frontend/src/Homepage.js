import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Promote from "./components/Promote"
import ShowMore_Product from "./components/ShowMore_Product";

function HomePage(props)
{


    return (
        <div className="homepage-contrainer">
            <Navbar setToken={props.setToken}/>
            <Promote/>
            <ShowMore_Product/>
        </div>

    );

}

export default HomePage;