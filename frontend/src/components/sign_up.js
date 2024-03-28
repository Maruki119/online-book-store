import React, { useState } from "react";
import axios from "axios";
import "./Sign-Up.css";

function SignUp(props) {
  const [user, setUser] = useState({
    email: "",
    user: "",
    password: "",
    passwordCheck: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSignUp = () => {
    const data = {
      email: user.email,
      user: user.user,
      password: user.password,
    };

    if (user.email === "" || user.user === "" || user.password === "" || user.passwordCheck === "") {
      alert("Please, Fill in the required information!");
      return;
    }

    if (user.password !== user.passwordCheck) {
      alert("Password does not match!");
      return;
    }

    axios
      .post("http://127.0.0.1:5000/users", data)
      .then((response) => {
        setUser(response.data);
        setMessage("Sign-Up Successfully");
        alert("Sign-Up Successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error", error);
        setMessage(
          error.response.data.message || "An error occurred while adding the product."
        );
        alert("Your Username or E-mail has been used!");
      });
  };

  return (
    <div className="SignUp">
      <div className="Full-BG">
        <div className="Container">
          <img
            className="Exit-Button"
            src="/images/cross-small.png"
            onClick={props.onCloseSignUp}
          />
          <img className="Logo" src="/images/Khaoklong.png" alt="Login Logo" />
          <h2 className="SignUp-Title">สมัครบัญชี ข้าวกล่อง E-Book</h2>

          <p className="SignUp-SubTitle">อีเมล</p>
          <input
            className="TextBox-Email"
            type="email"
            placeholder="อีเมล"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <p className="SignUp-SubTitle">ชื่อผู้ใช้</p>
          <input
            className="TextBox-Name"
            type="text"
            placeholder="ชื่อผู้ใช้"
            id="user"
            name="user"
            value={user.user}
            onChange={handleChange}
          />

          <p className="SignUp-SubTitle">รหัสผ่าน</p>
          <input
            className="TextBox-Password"
            type="password"
            placeholder="รหัสผ่าน"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />

          <p className="SignUp-SubTitle">ยืนยันรหัสผ่าน</p>
          <input
            className="TextBox-Password"
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            id="passwordCheck"
            name="passwordCheck"
            value={user.passwordCheck}
            onChange={handleChange}
          />

          <button className="Button" type="submit" onClick={onSignUp}>
            สมัครสมาชิก
          </button>

          <p className="Text-Reg">
            ฉันมีบัญชีข้าวกล่อง E-book อยู่แล้ว
            <a className="SignIn-Link" href="#">
              เข้าสู่ระบบ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;