import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Profile from "./Navbar_Login";
import useToken from './useToken';
import "./Detail_Product_login_ID.css"
import Footer from "./Footer";

function Detail_Product_login_ID(){
    const [selectedBook, setSelectedBook] = useState(null);
    const { token, removeToken, setToken } = useToken();
    const { bookId } = useParams();

    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        getData();
        axios.get(`http://127.0.0.1:5000/books/${bookId}`)
            .then((response) => {
                setSelectedBook(response.data);
            })
            .catch((error) => {
                console.error("Error fetching book:", error);
            });
    }, [bookId]);

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
  
    function onWishlist(){
        axios.put(`http://127.0.0.1:5000/users/${profileData._id}/add_to_wishlist`, {
            book_id: bookId
        },{
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            const message = response.data.message;
            console.log(response.data);
            alert(message);
            
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          })
    }

    function onCart(){
        axios.put(`http://127.0.0.1:5000/users/${profileData._id}/add_to_cart`, {
            book_id: bookId
        },{
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            const message = response.data.message;
            console.log(response.data);
            alert(message);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        })
    }

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
                                    <Link to={"/checkout"} >
                                        <button className="buttom-buynow" onClick={onCart}>
                                            ซื้อเลย
                                        </button>
                                    </Link>
                                    <button className="buttom-cart" onClick={onCart}>
                                        <img src="/images/cart.png" alt="cart" />
                                    </button>
                                    <button className="buttom-heart" onClick={onWishlist}>
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
            <Footer/>
        </div>
    );
}

export default Detail_Product_login_ID;