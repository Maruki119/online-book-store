import PurchasePage from "./components/Purchase";
import Profile from "./components/Navbar_Login";
import useToken from './components/useToken'
import Footer from "./components/Footer";
function Checkout_page()
{

    const { token, removeToken, setToken } = useToken();

    return (
        <div className="homepage-contrainer">
            <Profile token={token} removeToken = {removeToken} setToken={setToken}/>
            <PurchasePage/>
            <Footer/>
        </div>

    );

}

export default Checkout_page;