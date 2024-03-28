import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Profile from "./Navbar_Login";
import useToken from './useToken'

function Detail_Product_login_ID(){
    const [selectedBook, setSelectedBook] = useState(null);
    const { token, removeToken, setToken } = useToken();
    const { bookId } = useParams();
  
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/books/${bookId}`)
            .then((response) => {
                setSelectedBook(response.data);
            })
            .catch((error) => {
                console.error("Error fetching book:", error);
            });
    }, [bookId]);
  
    return (
        <div className="ShowDetailProduct-contrainer">
            <Profile token={token} removeToken = {removeToken} setToken={setToken}/>
            <div className="Detail-Product">
                {selectedBook && (
                    <div className="product-item">
                        <img className="book-image" src={selectedBook.image} alt={selectedBook.title} />
                        <h2>{selectedBook.title}</h2>
                        <p>ผู้เขียน: {selectedBook.author}</p>
                        <p>หมวดหมู่: {selectedBook.category}</p>
                        <p>ราคา: {selectedBook.price} บาท</p>
                    </div>
            )}
            </div>
        </div>
    );
}

export default Detail_Product_login_ID;