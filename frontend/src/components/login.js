import React, { useState , useEffect } from "react";
import './login.css'

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  useEffect (() => {
    console.log('Popup Start');
    return () => {
        console.log('Popup End')
    }
  } , []);

  return (
    <div className="SignIn">
        <div className="Bg-sign-in">
          <div className="login-container">
              <img className="cross-logo-signIn" src="./images/cross-small.png"onClick={props.onCloseSignIn}/>
              <img className="login-logo" src="/images/Khaoklong.png" alt="Login Logo" />
              <h2 className="login-title">ยินดีต้อนรับ เข้าสู่ระบบ!</h2>
              <p className="login-subtitle">หากมีบัญชีแล้ว สามารถเข้าสู่ระบบด้วยบัญชีเดิมได้เลย</p>
              
              <input
                // className="login-input"
                type="email"
                placeholder="อีเมลหรือชื่อผู้ใช้"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <input
                type="password"
                placeholder="รหัสผ่าน"
                // className="login-input2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="login-forget">
                  <u>ลืมรหัสผ่าน</u>
              </p>
              <button type="submit" className="login-button">
                เข้าสู่ระบบ
              </button>
              <p className="login-options">สมัครสมาชิกข้าวกล่อง e-book ด้วยอีเมล 
                <a href="/signup" className="login-link">
                  <u>สมัครสมาชิก</u>
                </a>
              </p>
          </div>
        </div>
    </div>
    
  );
};

export default LoginForm;