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
                <div className="product-item">
                    <ul>
                    {books.length > 0 && books.find(book => book._id === 1) && (
                        <div>
                            <img className="book-image" src={books.find(book => book._id === 1).image} alt={books.title} />
                            <h2>{books.find(book => book._id === 1).title}</h2>
                            <p>ผู้เขียน: {books.find(book => book._id === 1).author}</p>
                            <p>หมวดหมู่: {books.find(book => book._id === 1).category}</p>
                            <p>ราคา: {books.find(book => book._id === 1).price} บาท</p>
                        </div>
                    )}
                    </ul>
                </div>
                <div className="product-item">
                    <ul>
                    {books.length > 0 && books.find(book => book._id === 2) && (
                        <div>
                            <img className="book-image" src={books.find(book => book._id === 2).image} alt={books.title} />
                            <h2>{books.find(book => book._id === 2).title}</h2>
                            <p>ผู้เขียน: {books.find(book => book._id === 2).author}</p>
                            <p>หมวดหมู่: {books.find(book => book._id === 2).category}</p>
                            <p>ราคา: {books.find(book => book._id === 2).price} บาท</p>
                        </div>
                    )}
                    </ul>
                </div> 
                <div className="product-item">
                    <ul>
                    {books.length > 0 && books.find(book => book._id === 3) && (
                        <div>
                            <img className="book-image" src={books.find(book => book._id === 3).image} alt={books.title} />
                            <h2>{books.find(book => book._id === 3).title}</h2>
                            <p>ผู้เขียน: {books.find(book => book._id === 3).author}</p>
                            <p>หมวดหมู่: {books.find(book => book._id === 3).category}</p>
                            <p>ราคา: {books.find(book => book._id === 3).price} บาท</p>
                        </div>
                    )}
                    </ul>
                </div>     
            </div>

        </div>

    );
}

export default ShowMore_Product