import React, { useState, useEffect } from 'react';
import './Purchase.css'; // Import the CSS file
import BookDetail from './BookDetail';
import axios from "axios";
import useToken from './useToken'

const PurchasePage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: ''
  });

  const [books, setBooks] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const { token, removeToken, setToken} = useToken();

  useEffect(() => {
    if (profileData) {
      fetchBooksForUser();
    }
  }, [profileData]);

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

  function fetchBooksForUser() {
    axios.get(`http://127.0.0.1:5000/users/${profileData._id}/cart`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => {
        setBooks(response.data.books);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }

  const totalPrice = books.reduce((total, book) => total + book.price, 0);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleClick = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    setIsProcessing(true);
    // Simulate a payment process
    setTimeout(() => {
      setIsProcessing(false);
      alert('Purchase successful!');
    }, 2000);
  };

  return (
    <div className="purchase-container">
    <div className="purchase-details">
      <h1>Book Details</h1>
      <div className="book-detail-container">
        {books.map((book) => (
          <BookDetail key={book.id} book={book} />
        ))}
      </div>
    </div>
      <div className="purchase-details">
        <h1>Payment Method</h1>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="creditCard"
            checked={selectedPaymentMethod === 'creditCard'}
            onChange={() => handlePaymentMethodChange('creditCard')}
          />
          <span>Credit Card</span>
        </label>
        {selectedPaymentMethod === 'creditCard' && (
          <div className="input-box">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={userInfo.cardNumber}
              onChange={handleInputChange}
            />
            <div className="exp-cvv-container">
              <input
                type="text"
                name="exp"
                placeholder="EXP"
                value={userInfo.exp}
                onChange={handleInputChange}
                className="exp-input"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={userInfo.cvv}
                onChange={handleInputChange}
                className="cvv-input"
              />
            </div>
          </div>
        )}
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={selectedPaymentMethod === 'paypal'}
            onChange={() => handlePaymentMethodChange('paypal')}
          />
          <span>PayPal</span>
        </label>
        {selectedPaymentMethod === 'paypal' && (
          <div className="input-box">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userInfo.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={userInfo.address}
              onChange={handleInputChange}
            />
          </div>
        )}
        <p>Total Price: {totalPrice.toFixed(2)} ฿</p>
        <div className="purchase-button-container">
          <button onClick={handleClick} disabled={isProcessing} className="purchase-button">
            {isProcessing ? 'Processing...' : 'Purchase'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;




