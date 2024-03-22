import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Promote from "./components/Promote"

function HomePage()
{


    return (
        <div >    
            <Navbar/>
            <Promote/> 
        </div>

    );

}

export default HomePage;