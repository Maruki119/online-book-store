import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Profile from "./Navbar_Login";
import useToken from './useToken'
import './Category.css'
import Footer from "./Footer";

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
    <div className="Detail_Category-container">
      <Profile token={token} removeToken={removeToken} setToken={setToken} />
      <div className="Detail_Category-Product">

        <div className="Category-text">
            <p>ค้นหา</p>
        </div>
        <div className="Search-container">
          <form className="search-category">
              <input type="text" placeholder="Search..." className="search-input"/>
          </form>
        </div>
        <div className="Product_Category-container">

            <div className="Side_bar-Category">
                <div className="choose-container">                 
                    <botton>เลือกหมวด</botton>
                    <div className="choose_Category">
                        <botton>ทุกหมวดหมู่</botton>
                        <botton>การ์ตูน</botton>
                        <div className="sub-choose_Category">
                          <botton>การ์ตูนโรแมนซ์</botton>
                          <botton>การ์ตูนแอคชั่น</botton>
                          <botton>การ์ตูนไซไฟ</botton>
                          <botton>การ์ตูนตลก</botton>
                          <botton>การ์ตูนกีฬา</botton>
                        </div>
                        <botton>นิยาย</botton>
                        <div className="sub-choose_Category">
                          <bottonl>นิยายสืบสวน</bottonl>
                          <botton>นิยายไซไฟ</botton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Show-Product-Category">
                {booksInCategory.map((book) => (
                  <div className="Detail_Category-item" key={book._id}>
                    <Link to={`/detail/${book.category}/${book._id}`} className="book-link">
                      <img className="Detail_Category-image" src={book.image} alt={book.title} />
                      <h2>{book.title}</h2>
                      <p>ผู้เขียน: {book.author}</p>
                      <p>หมวดหมู่: {book.category}</p>
                      <p>ราคา: {book.price} บาท</p>
                    </Link>
                  </div>
                ))}
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Detail_Product_login_Category;