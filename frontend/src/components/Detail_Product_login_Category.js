import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Profile from "./Navbar_Login";
import useToken from './useToken'
import './Category.css'
import Footer from "./Footer";

function Detail_Product_login_Category() {

  const [activeTab, setActiveTab] = useState('All_categories');
  const [booksInCategory, setBooksInCategory] = useState([]);
  const { token, removeToken, setToken } = useToken();
  const { category } = useParams();

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    // Check if 'All_categories' is selected
    if (activeTab === 'All_categories') {
      axios.get(`http://127.0.0.1:5000/books`)
        .then((response) => {
          setBooksInCategory(response.data.books);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    } else {
      axios.get(`http://127.0.0.1:5000/books/${activeTab}`)
        .then((response) => {
          setBooksInCategory(response.data.books);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    }
  }, [activeTab]);

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
                    <h2>เลือกหมวด</h2>
                    <div className="choose_Category">
                        <button onClick={() => openTab('All_categories')} className={activeTab === 'All_categories' ? 'active' : ''}>● ทุกหมวดหมู่</button>
                        <button >● การ์ตูน</button>
                        <div className="sub-choose_Category">
                          <button onClick={() => openTab('Action')} className={activeTab === 'Action' ? 'active' : ''}>การ์ตูนแอคชั่น</button>
                          <button onClick={() => openTab('Comedy')} className={activeTab === 'Comedy' ? 'active' : ''}>การ์ตูนตลก</button>
                          <button onClick={() => openTab('Romantic')} className={activeTab === 'Romantic' ? 'active' : ''}>การ์ตูนโรแมนซ์</button>
                          <button onClick={() => openTab('Sport')} className={activeTab === 'Sport' ? 'active' : ''}>การ์ตูนกีฬา</button>
                          <button onClick={() => openTab('Sci fi')} className={activeTab === 'Sci fi' ? 'active' : ''}>การ์ตูนไซไฟ</button>
                        </div>
                        <button>● นิยาย</button>
                        <div className="sub-choose_Category">
                          <button onClick={() => openTab('Sci fi Novels')} className={activeTab === 'Sci fi Novels' ? 'active' : ''}>นิยายไซไฟ</button>
                          <button onClick={() => openTab('Detective Novels')} className={activeTab === 'Detective Novels' ? 'active' : ''}>นิยายสืบสวน</button>
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
