import React, { useState, useEffect } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "./Homepage";
import Login from './components/login'
import useToken from './components/useToken'
import SignUp from "./components/sign_up";
import HomePage_Login from "./Homepage_Login";
import Checkout_page from "./Checkout";
import Forgetpassword from "./components/forgetpassword";
import Detail_Product_login_ID from "./components/Detail_Product_login_ID";
import Detail_Product_login_Category from "./components/Detail_Product_login_Category";

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div className="App">
        {!token && token !== "" && token !== undefined? (
          <>
            <Routes>
              <Route exact path = "/" element = {<HomePage setToken={setToken}/>}/>
              <Route exact path = "/forgetpassword" element = {<Forgetpassword/>}></Route>
            </Routes>
          </>
        ): (
          <>
            <Routes>
              <Route exact path = "/" element = {<HomePage_Login/>}></Route>
              <Route exact path = "/checkout" element = {<Checkout_page/>}></Route>
              <Route path = "/detail/:category" element = {<Detail_Product_login_Category/>}></Route>
              <Route path = "/detail/:category/:bookId" element = {<Detail_Product_login_ID/>}></Route>
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;