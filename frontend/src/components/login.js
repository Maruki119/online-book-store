import React, { useState , useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Sign-Up.css'

const LoginForm = (props) => {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: ""
  })

  function handleSubmit(event) {
    event.preventDefault();
    if (loginForm.email.trim() === "" || loginForm.password.trim() === "") {
      alert("กรุณากรอกทั้งอีเมลและรหัสผ่าน!");
      return;
    }
  
    axios.post("http://127.0.0.1:5000/token", {
      email: loginForm.email,
      password: loginForm.password
    })
    .then((response) => {
      props.setToken(response.data.access_token);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("อีเมล หรือรหัสผ่านผิดพลาด!");
      }
    });
  
    setloginForm({
      ...loginForm,
      password: ""
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setloginForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div className="SignIn">
      <div className="Full-BG">
        <div className="Container">
          <img className="Exit-Button" src="/images/cross-small.png" onClick={props.onCloseSignIn} />
          <img className="Logo" src="/images/Khaoklong.png" alt="Login Logo" />
          <h2 className="SignIn-Title">ยินดีต้อนรับ เข้าสู่ระบบ!</h2>
          <p className="SignIn-SubTitle">หากมีบัญชีแล้ว สามารถเข้าสู่ระบบด้วยบัญชีเดิมได้เลย</p>
        <form>
          <input className="TextBox-Email"
            type="email"
            text={loginForm.email} 
            name="email"
            placeholder="อีเมลหรือ"
            value={loginForm.email}
            onChange={handleChange}
          />

          <input className="TextBox-Password"
            type="password"
            text={loginForm.password} 
            placeholder="รหัสผ่าน"
            name="password"
            value={loginForm.password}
            onChange={handleChange}
          />

          <p className="Text-Forget">
            <Link to = {"/forgetpassword"}>
              <u>ลืมรหัสผ่าน</u>
            </Link>
          </p>

          <button className="Button"
            type="submit"
            onClick={handleSubmit}>
            เข้าสู่ระบบ
          </button>
        </form>

          <p className="Text-Reg">สมัครสมาชิกข้าวกล่อง e-book ด้วยอีเมล
            <a className="SignIn-Link" href="/signup">
              สมัครสมาชิก
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

