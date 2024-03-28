import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShowMore_Product.css";
import { Link } from "react-router-dom";

function ShowMore_Product() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/books')
      .then(response => {
        setBooks(response.data.books);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  // Function to generate category containers
  const renderCategory = (categoryTitle, book) => {
    return (
      <div className="Category-Container">
        <button className="Category">{categoryTitle}</button>
        <a className="Category-Link" href="#">
          ดูทั้งหมด
        </a>
      </div>
    );
  };

  // Function to render individual book items
  const renderBookItem = (book) => {
    return (
        <div className="product-item" key={book._id}>
            <Link to={`/detail/${book.category}/${book._id}`} className="book-link">
                <img className="book-image" src={book.image} alt={book.title} />
                <h2>{book.title}</h2>
                <p>ผู้เขียน: {book.author}</p>
                <p>หมวดหมู่: {book.category}</p>
                <p>ราคา: {book.price} บาท</p>
            </Link>
        </div>
    );
  };

  return (
    <div className="Product-Container">
      {renderCategory("หมวด  แอ็คชั่น")}
      <div className="product_Category-Container">
        {books.filter(book => book.category === "Action").map(filteredBook => (
          renderBookItem(filteredBook)
        ))}
      </div>

      {renderCategory("หมวด  คอมเมดี้")}
      <div className="product_Category-Container">
        {books.filter(book => book.category === "Comedy").map(filteredBook => (
          renderBookItem(filteredBook)
        ))}
      </div>

      {renderCategory("หมวด  โรแมนติก")}
      <div className="product_Category-Container">
        {books.filter(book => book.category === "Romantic").map(filteredBook => (
          renderBookItem(filteredBook)
        ))}
      </div>

      {renderCategory("หมวด  นิยายไซ-ไฟ")}
      <div className="product_Category-Container">
        {books.filter(book => book.category === "Sci fi Novels").map(filteredBook => (
          renderBookItem(filteredBook)
        ))}
      </div>
    </div>
  );
}

export default ShowMore_Product;