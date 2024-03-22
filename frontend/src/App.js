import React, { useState, useEffect } from "react";
import HomePage from "./Homepage";
import Home from "./components/Home";
import List from "./components/List";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = "/" element = {<HomePage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
