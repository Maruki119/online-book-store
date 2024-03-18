import "./sign_up.css"
import React, {useState, useEffect} from "react"
import axios from "axios"

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
        <div className = "Bg-sign-up">
            <div className="sign-up-container">
            <img className="cross-logo" src='/images/cross-small.png'onClick={props.onCloseSignUp}/>
                <div className="logo-App">
                    <img src="images/Khaoklong.png"/>
                </div>

                <h3>สมัครบัญชี ข้าวกล่อง E-book</h3>

                <form>

                    <div className="form-group">
                        <label htmlFor="email">อีเมล </label>
                        <input type="email" id="email" name="email" placeholder="อีเมล" ref = {email} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">ชื่อผู้ใช้ </label>
                        <input type="name" id="name" name="name" placeholder="ชื่อผู้ใช้" ref = {name} required />
                    </div> 

                    <div className="form-group">
                        <label htmlFor="password">รหัสผ่าน </label>
                        <input type="password" id="password" name="password" placeholder="รหัสผ่าน" ref = {password} required />
                    </div>
                    
                    <button type="submit" class="SignUp-Button" onClick = {onSignUp}> สมัครสมาชิก</button>

                    <div class="SignIn">

                        <p>ฉันมีบัญชีข้าวกล่อง E-book อยู่แล้ว  
                        <a href="#" class="login-link"> เข้าสู่ระบบ</a>
                        </p>

                    </div>
                </form>
            </div>
        </div>
    );
}
export default SignUp;