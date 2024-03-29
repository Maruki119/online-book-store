import React, { useState, useEffect} from "react";
import "./Topup.css";
import axios from "axios";
import useToken from './useToken'

function Topup() {
  const [selectedAmount, setSelectedAmount] = useState(null);

  const [profileData, setProfileData] = useState(null);
  const { token, removeToken, setToken} = useToken();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get("http://127.0.0.1:5000/profile", {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then((response) => {
      const res = response.data;
      res.access_token && setToken(res.access_token);
      setProfileData({
        _id: res._id,
        user: res.user,
        email: res.email,
        fullname: res.fullname,
        password: res.password,
        card_id: res.card_id,
        balance: res.balance,
        book_access: res.book_access,
        cart: res.cart,
        wishlist: res.wishlist
      });
    })
    .catch((error) => {
      console.error('Error fetching profile data:', error);
    });
  }

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
    console.log(amount)
  };

  const handleTopup = () => {
    let topup = selectedAmount + profileData.balance;
    axios.put(`http://127.0.0.1:5000/users/${profileData._id}`, {
      balance: topup
    },{
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => {
        console.log(response.data);
        console.log('Top-up amount:', selectedAmount);
        alert(`Topup ${selectedAmount}฿ Successfully!`);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error fetching balance:', error);
      })
  };

  return (
    <div className="topup">
      <div className="topup-amounts">
        {[59, 119, 199, 329, 499, 1000].map((amount, index) => (
          <div className="topup-box" key={index} >
            <div className={`price-container ${selectedAmount === amount ? 'selected' : ''}`} onClick={() => handleSelectAmount(amount)}>
            <img className = "coin" src="/images/coin.png" alt="coin-icon"  />
              <label>
                {amount} ฿
                <input
                  type="radio"
                  value={amount}
                  checked={selectedAmount === amount}
                  onChange={() => handleSelectAmount(amount)}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className="topup-button">
        <button onClick={handleTopup} className="bigger-button">เติมเงิน</button>
      </div>
    </div>
  );
}

export default Topup;