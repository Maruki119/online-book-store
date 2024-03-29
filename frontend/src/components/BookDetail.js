// BookDetail.js
import React from 'react';
import './BookDetail.css'; // Import the CSS file
import axios from "axios";

const BookDetail = ({ book, userId, token }) => {
  
  function onDelete(){
    axios.delete(`http://127.0.0.1:5000/users/${userId}/remove_from_cart/${book._id}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then((response) => {
        const message = response.data.message;
        console.log(response.data);
        alert(message);
        window.location.reload();
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    })
  }

  return (
    <div className="book-item">
      <img src={book.image} alt={book.title} className="book-image" />
      <div className="book-info">
        <h2 className="book-title">{book.title}</h2>
        <p className="book-author">By {book.author}</p>
        <p className="book-price">฿{book.price.toFixed(2)}</p>
        <p className="book-description">{book.description}</p>
        <button className="delete-button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookDetail;

