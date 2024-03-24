import React ,{useEffect,useState} from "react";
import "./ShowMore_Product.css"
import axios from "axios";

function ShowMore_Product(){

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

    return(
        <div className="Product-Container">
            <div className="Category-Container">
                <button className="Category">หมวด  แอ็คชั่น</button>
                <a className="Category-Link" href="#">
                    ดูทั้งหมด
                </a>
            </div>
            <div className="product_Category-Container">
                {books.filter(book => book.category === "Action").map(filteredBook => (
                        <div className="product-item">
                            <ul>
                                <div key={filteredBook._id}>
                                    <img className="book-image" src={filteredBook.image} alt={filteredBook.title} />
                                    <h2>{filteredBook.title}</h2>
                                    <p>ผู้เขียน: {filteredBook.author}</p>
                                    <p>หมวดหมู่: {filteredBook.category}</p>
                                    <p>ราคา: {filteredBook.price} บาท</p>
                                </div>
                            </ul>
                        </div>
                    ))}
            </div>
        </div>

    );
}

export default ShowMore_Product