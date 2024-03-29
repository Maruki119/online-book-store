import React, { useState } from "react";
import "./Topup.css";

function Topup() {
  const [selectedAmount, setSelectedAmount] = useState(null);

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
  };

  const handleTopup = () => {
    console.log('Top-up amount:', selectedAmount);
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