import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Profile from "./Navbar_Login";
import useToken from './useToken'

function Detail_Product_login_Category() {
  const [booksInCategory, setBooksInCategory] = useState([]);
  const { token, removeToken, setToken } = useToken();
  const { category } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/books/${category}`)
      .then((response) => {
        setBooksInCategory(response.data.books);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, [category]);

  return (
    <div className="ShowDetailProduct-container">
      <Profile token={token} removeToken={removeToken} setToken={setToken} />
      <div className="Detail-Product">
        <h1>Books in Category: {category}</h1>
        {booksInCategory.map((book) => (
          <div className="product-item" key={book._id}>
            <Link to={`/detail/${book.category}/${book._id}`} className="book-link">
              <img className="book-image" src={book.image} alt={book.title} />
              <h2>{book.title}</h2>
              <p>ผู้เขียน: {book.author}</p>
              <p>หมวดหมู่: {book.category}</p>
              <p>ราคา: {book.price} บาท</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Detail_Product_login_Category;