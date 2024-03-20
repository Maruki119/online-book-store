import React, { useState , useEffect } from "react";
import './Sign-In.css'

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
    <div className = "SignIn">
        <div className = "Full-BG">
          <div className = "Container">
              <img className = "Exit-Button" src = "./images/cross-small.png" onClick = {props.onCloseSignIn}/>
              <img className = "Logo" src = "/images/Khaoklong.png" alt = "Login Logo"/>
              <h2 className = "SignIn-Title">ยินดีต้อนรับ เข้าสู่ระบบ!</h2>
              <p className = "SignIn-SubTitle">หากมีบัญชีแล้ว สามารถเข้าสู่ระบบด้วยบัญชีเดิมได้เลย</p>
              
              <input className = "TextBox-Email"
                type = "email"
                placeholder = "อีเมลหรือชื่อผู้ใช้"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
              />

              <input className = "TextBox-Password"
                type = "password"
                placeholder = "รหัสผ่าน"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
              />

              <p className = "Text-Forget">
                  <u>ลืมรหัสผ่าน</u>
              </p>

              <button className = "Button" 
                type = "submit">
                  เข้าสู่ระบบ
              </button>

              <p className = "Text-Reg">สมัครสมาชิกข้าวกล่อง e-book ด้วยอีเมล
                <a className = "SignIn-Link"
                  href = "/signup">
                    สมัครสมาชิก
                </a>
              </p>
          </div>
        </div>
    </div>
  );
};

export default LoginForm;