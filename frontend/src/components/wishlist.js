import { useState, useEffect } from "react";
import axios from "axios";
import "./wishlist.css";
import useToken from './useToken'

function WishList() {
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
    axios.get(`http://127.0.0.1:5000/users/${profileData._id}/wishlist`, {
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

  const handleCartClick = (bookId) => {
    // Logic for adding the book to the cart
    console.log('Adding book to cart:', bookId);
  };

  const handleCrossClick = (bookId) => {
    // Logic for removing the book from the wishlist
    console.log('Removing book from wishlist:', bookId);
  };

  return (
    <div className="wishlist">
      <div className="text1-wishlist">
        <div className="text">
          <h2>อีบุ๊กที่อยากอ่าน</h2>
        </div>
      </div>
      <div className="WishlistInfoBook">
        {books.filter(book => book.category).map(filteredBook => (
          <div className="box" key={filteredBook._id}>
            <div className="book-container">
              <div className="bookImageWishList">
                <img className="book-imageWL" src={filteredBook.image} alt={filteredBook.title} />
              </div>
              <div className="book-info">
                <h2>{filteredBook.title}</h2>
                <p>{filteredBook.author}</p>
                <p>{filteredBook.price}.00 บาท</p>
              </div>
              <div className="button-icons">
                <img src="/images/cart.png" alt="Cart Icon" onClick={() => handleCartClick(filteredBook._id)} />
                <img src="/images/cross-small.png" alt="Cross Icon" onClick={() => handleCrossClick(filteredBook._id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishList;
