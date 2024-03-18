import React, { useState } from "react";
import "/.login.css"
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="login-container">
      <img className='login-logo' src={"/images/Khaoklong.png"} alt="Login Logo" />
      <h2 className="login-title">ยินดีต้อนรับ เข้าสู่ระบบ!</h2>
      <p className = "login-subtitle">หากมีบัญชีแล้ว สามารถเข้าสู่ระบบด้วยบัญชีเดิมได้เลย</p>
      <input
        type="email"
        placeholder="อีเมลหรือชื่อผู้ใช้"
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="รหัสผ่าน"
        className="login-input2"
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
  );
};

export default LoginForm;