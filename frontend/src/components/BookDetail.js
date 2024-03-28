// BookDetail.js
import React from 'react';
import './BookDetail.css'; // Import the CSS file

const BookDetail = ({ book, onDelete }) => {
  const handleDelete = () => {
    onDelete(book.id);
  };

  return (
    <div className="book-item">
      <img src={book.image} alt={book.title} className="book-image" />
      <div className="book-info">
        <h2 className="book-title">{book.title}</h2>
        <p className="book-author">By {book.author}</p>
        <p className="book-price">${book.price.toFixed(2)}</p>
        <p className="book-description">{book.description}</p>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookDetail;

