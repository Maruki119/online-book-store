import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Profile from "./Navbar_Login";
import useToken from './useToken';
import "./Detail_Product_login_ID.css"

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
                    <div className="Books_Info-container">
                        <div className="Detail-Product-container">
                                <img className="book-image-detial" src={selectedBook.image} alt={selectedBook.title} />

                            <div className="Info">
                                <h2 className="title-book">{selectedBook.title}</h2>
                                <p>ผู้เขียน: {selectedBook.author}</p>
                                <p>หมวดหมู่: {selectedBook.category}</p>
                                <p>ราคา: {selectedBook.price}.00 บาท</p>
                                
                                <div className="buttom-bar">
                                    <button className="buttom-buynow" >
                                        ซื้อเลย
                                    </button>
                                    <button className="buttom-cart" >
                                        <img src="/images/cart.png" alt="cart" />
                                    </button>
                                    <button className="buttom-heart">
                                        <img src="/images/heart.png" alt="heart" />
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="Synopsis">
                            <h2>เรื่องย่อ</h2>
                            <p>{selectedBook.synopsis}</p>
                        </div>
                    </div>    
                )}
            </div>
        </div>
    );
}

export default Detail_Product_login_ID;