import React, { useState, useEffect } from 'react';
import './Purchase.css'; // Import the CSS file
import BookDetail from './BookDetail';
import axios from "axios";
import useToken from './useToken';

const PurchasePage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
    exp: '',
    cvv: ''
  });

  const [books, setBooks] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const { token, removeToken, setToken} = useToken();
  const [cardData, setCardData] = useState(null);

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

  useEffect(() => {
    if (profileData && profileData.card_id) {
      axios.get(`http://127.0.0.1:5000/cards/number/${profileData.card_id}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then((response) => {
        const res = response.data;
        setCardData({
          _id: res._id,
          Card_number: res.Card_number,
          holder: res.holder,
          exp: res.exp,
          cvv: res.cvv,
          balance: res.balance
        });
      })
      .catch((error) => {
        console.error('Error fetching card data:', error);
      });
    }
  }, [profileData, token]);

  function fetchBooksForUser() {
    axios.get(`http://127.0.0.1:5000/users/${profileData._id}/cart`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => {
        setBooks(response.data.books);
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
    } else {
      console.log("Paid by : ", selectedPaymentMethod);
      if (selectedPaymentMethod === 'Balance') {
        if (!profileData) {
          alert("Profile data is not available.");
          return;
        }
        if (profileData.cart.length === 0) {
          alert("Your cart is empty.");
          return;
        }
        if (profileData.balance >= totalPrice) {
          const totalBalance = profileData.balance - totalPrice;
          axios.put(`http://127.0.0.1:5000/users/${profileData._id}`, 
            { balance: totalBalance },
            {
              headers: {
                Authorization: 'Bearer ' + token
              }
            })
            .then((response) => {
              console.log(response.data);
              console.log(response.data.message);
            })
            .catch((error) => {
              console.error('Error updating balance:', error);
            });
  
          profileData.cart.forEach(item => {
            axios.put(`http://127.0.0.1:5000/users/${profileData._id}/add_book`, 
              { book_id: item },
              {
                headers: {
                  Authorization: 'Bearer ' + token
                }
              })
              .then((response) => {
                console.log(response.data);
                console.log(response.data.message);
              })
              .catch((error) => {
                console.error('Error adding book to user:', error);
              });
          });
          window.location.reload();
        } else {
          alert("You don't have enough Balance.");
        }
      } else if (selectedPaymentMethod === 'creditCard') {
        if (!cardData) {
          alert("Card data is not available.");
          return;
        }
        if (profileData.cart.length === 0) {
          alert("Your cart is empty.");
          return;
        }
  
        if (userInfo.exp !== cardData.exp || userInfo.cvv !== cardData.cvv){
          alert("Your exp or cvv are not match!");
          return;
        }
  
        if (cardData.balance >= totalPrice) {
          const totalBalance = cardData.balance - totalPrice;
          axios.put(`http://127.0.0.1:5000/cards/${cardData._id}`, 
            { balance: totalBalance },
            {
              headers: {
                Authorization: 'Bearer ' + token
              }
            })
            .then((response) => {
              console.log(response.data);
              console.log(response.data.message);
            })
            .catch((error) => {
              console.error('Error updating card balance:', error);
            });
  
          profileData.cart.forEach(item => {
            axios.put(`http://127.0.0.1:5000/users/${profileData._id}/add_book`, 
              { book_id: item },
              {
                headers: {
                  Authorization: 'Bearer ' + token
                }
              })
              .then((response) => {
                console.log(response.data);
                console.log(response.data.message);
              })
              .catch((error) => {
                console.error('Error adding book to user:', error);
              });
          });
          window.location.reload();
        } else {
          alert("You don't have enough Balance.");
        }
      }
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
            <BookDetail key={book.id} book={book} userId={profileData._id} token={token}/>
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
              placeholder="Plase Enter Credit-Card in setting first."
              value={cardData ? cardData.Card_number : ''}
              onChange={handleInputChange}
              readOnly
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
            value="Balance"
            checked={selectedPaymentMethod === 'Balance'}
            onChange={() => handlePaymentMethodChange('Balance')}
          />
          <span>Balance💰</span>
        </label>

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
