import React, { useState , useEffect } from "react";
import './forgetpassword.css'

const Forgetpassword = (props) => {
  const [email, setEmail] = useState("");

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
    <div className="Forgetpassword">
        <div className="Bg-sign-in">
            <div className="forget-container">
            <h2 className="forget-title">ลืมรหัสผ่าน</h2>
            <p className = "forget-subtitle">ระบุอีเมลที่ใช้สมัคร</p>
            <input
                type="email"
                placeholder="อีเมล"
                className="forget-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <p className="forget-options">ระบบจะทำการส่งลิงก์คำขอเพื่อตั้งรหัสผ่านใหม่ให้คุณผ่านทางอีเมล </p>
            <div class="button-container">
                <button type="submit" className="forget-button">ยกเลิก</button>
                <button type="button" className="forget-button2">ตกลง</button>
            </div>
            </div>
        </div>
    </div>
    
  );
};


export default ForgetPasswordForm;