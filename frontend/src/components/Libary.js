import { useState, useEffect } from "react";
import axios from "axios";
import "./Libary.css";

function Libary() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/books')
      .then(response => {
        setBooks(response.data.books);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleCartClick = (bookId) => {
    // Logic for adding the book to the cart
    console.log('Adding book to cart:', bookId);
  };

  const handleCrossClick = (bookId) => {
    // Logic for removing the book from the wishlist
    console.log('Removing book from libary:', bookId);
  };

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
