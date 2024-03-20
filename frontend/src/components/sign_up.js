import React, {useState, useEffect} from "react"
import axios from "axios"
import "./Sign-In.css"

function SignUp(props) {
    const email = React.createRef();
    const name = React.createRef();
    const password = React.createRef();

    const [user, setUser] = useState();
    const [message, setMessage] = useState('');

    const onSignUp = () => {
        const data = {
            email: email.current.value,
            user: name.current.value,
            password: password.current.value
        };
        axios.post("http://127.0.0.1:5000/users", data)
            .the((response) => {
                setUser(response.data)
                setMessage("Sign-Up Successfully")
            })
            .catch(error => {
                console.error("Error", error)
                setMessage(error.response.data.message || 'An error occurred while adding the product.');
            });
    }

    return (
        <div className = "SignUp">
            <div className = "Full-BG">
                <div className = "Container">
                    <img className = "Exit-Button" src = "./images/cross-small.png" onClick = {props.onCloseSignUp}/>
                    <img className = "Logo" src = "/images/Khaoklong.png" alt = "Login Logo"/>
                    <h2 className = "SignUp-Title">สมัครบัญชี ข้าวกล่อง E-Book</h2>

                    <p className = "SignUp-SubTitle">อีเมล</p>
                    <input className = "TextBox-Email"
                    type = "email"
                    placeholder = "อีเมล"
                    // value
                    // onChange
                    />

                    <p className = "SignUp-SubTitle">ชื่อผู้ใช้</p>
                    <input className = "TextBox-Name"
                    type = "name"
                    placeholder = "ชื่อผู้ใช้"
                    // value
                    // onChange
                    />

                    <p className = "SignUp-SubTitle">รหัสผ่าน</p>
                    <input className = "TextBox-Password"
                    type = "password"
                    placeholder = "รหัสผ่าน"
                    // value
                    // onChange
                    />

                    <p className = "SignUp-SubTitle">ยืนยันรหัสผ่าน</p>
                    <input className = "TextBox-Password"
                    type = "password"
                    placeholder = "ยืนยันรหัสผ่าน"
                    // value
                    // onChange
                    />

                    <button className = "Button"
                    type = "submit"
                    onClick = {onSignUp}>
                        สมัครสมาชิก
                    </button>

                    <p className = "Text-Reg">ฉันมีบัญชีข้าวกล่อง E-book อยู่แล้ว
                        <a className = "SignIn-Link"
                        href = "#">
                            เข้าสู่ระบบ
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default SignUp;