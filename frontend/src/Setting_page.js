import Profile from "./components/Navbar_Login";
import useToken from './components/useToken'
import Footer from "./components/Footer";
import Setting from "./components/Setting";
function Setting_page()
{

    const { token, removeToken, setToken } = useToken();

    return (
        <div className="homepage-contrainer">
            <Profile token={token} removeToken = {removeToken} setToken={setToken}/>
            <Setting/>
            <Footer/>
        </div>

    );

}

export default Setting_page;