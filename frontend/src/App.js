import React, { useState, useEffect } from "react";
import './App.css';

import Home from "./components/Home";
import List from "./components/List";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = "/" element = {<Home/>}/>
          <Route exact path = "/list" element = {<List/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
