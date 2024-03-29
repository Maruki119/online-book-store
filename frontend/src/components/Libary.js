import { useState, useEffect } from "react";
import axios from "axios";
import "./Libary.css";
import useToken from './useToken';

function Libary() {
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
    axios.get(`http://127.0.0.1:5000/users/${profileData._id}/book_access`, {
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
  
  return (
    <div className="libary">
      <div className="text1-libary">
        <div className="text">
          <h2>ชั้นหนังสือ</h2>
        </div>
      </div>
      <div className="LibaryInfoBook">
        {books.filter(book => book.category).map(filteredBook => (
          <div className="boxLB" key={filteredBook._id}>
            <div className="libary-container">
              <div className="bookImageLibary">
                <img className="book-imageLB" src={filteredBook.image} alt={filteredBook.title} />
              </div>
              <div className="book-infoLB">
                <h2>{filteredBook.title}</h2>
                <p>{filteredBook.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Libary;
