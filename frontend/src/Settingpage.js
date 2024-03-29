import Profile from "./components/Navbar_Login";
import useToken from './components/useToken'
import Footer from "./components/Footer";
import SettingsPage from "./components/Setting";
function Settingpage()
{

    const { token, removeToken, setToken } = useToken();

    return (
        <div className="settingpage-contrainer">
            <Profile token={token} removeToken = {removeToken} setToken={setToken}/>
            <SettingsPage/>
            <Footer/>
        </div>

    );

}

export default Settingpage;