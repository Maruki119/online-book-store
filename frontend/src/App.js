import React, { useState, useEffect } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "./Homepage";
import Login from './components/login'
import useToken from './components/useToken'
import SignUp from "./components/sign_up";
import HomePage_Login from "./Homepage_Login";

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div className="App">
        {!token && token !== "" && token !== undefined? (
          <HomePage setToken={setToken}/>
        ): (
          <>
            <Routes>
              <Route exact path = "/" element = {<HomePage_Login/>}></Route>
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;