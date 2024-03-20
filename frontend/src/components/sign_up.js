import "./sign_up.css"
function SignUp(props)

{
    return (
        <div classname="SignUp">
            <div className = "Bg-sign-up">
                <div className="sign-up-container">
                    <img classname="cross-logo-signUp" src='./images/cross-small.png' onClick={props.onCloseSignUp}/>
                    <img className="login-logo" src="/images/Khaoklong.png" alt="Login Logo"/>
                    <h2 classname="sign-up-title">สมัครบัญชี ข้าวกล่อง E-book</h2>

                    <div className="form-group">
                        <label htmlFor="email">อีเมล </label>
                        <input type="email" id="email" name="email" placeholder="อีเมล" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">ชื่อผู้ใช้ </label>
                        <input type="name" id="name" name="name" placeholder="ชื่อผู้ใช้" required />
                    </div> 

                    <div className="form-group">
                        <label htmlFor="password">รหัสผ่าน </label>
                        <input type="password" id="password" name="password" placeholder="รหัสผ่าน" required />
                    </div>
                    
                    <button type="submit" class="SignUp-Button"> สมัครสมาชิก</button>

                    <div class="SignIn">

                        <p>ฉันมีบัญชีข้าวกล่อง E-book อยู่แล้ว  
                        <a href="#" class="login-link"> เข้าสู่ระบบ</a>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default SignUp;