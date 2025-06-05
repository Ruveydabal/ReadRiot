import "../css/Favorite.scss";
import React, { useEffect, useState } from 'react';
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase.jsx";

const AllBooks = ({books}) => {
    const [getBooks, setGetBooks] = useState([]);
    const book = collection(db, "Books");
    
    useEffect(() => {
        const getBookDetails = async () => {
            const data = await getDocs(book)
            setGetBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        }
        getBookDetails();
    }, []);
    
    const deleteBook = async (id) => {
        await deleteDoc(doc(collection(db, "Books"), id));
    }
   
    return (
        <div className="booksBackgroundWhite">
            <div className="booksContainer">
                {getBooks && getBooks.map((book, index) => (
                    <section className="booksFeed">
                        <div key={index}>     
                            <div className="bookTextBlock">
                                <a className="bookTextBold">{book.title}</a>
                            </div>
                        <div className="bookTextBlock">
                                <a className="bookTextBold">Auteur: </a> 
                                <a className="bookText">{book.author}</a>
                        </div> 
                            <div className="bookTextBlock">
                                <a className="bookTextBold">Beschrijving: </a> 
                                <a className="bookText">{book.description}</a>
                            </div>
                        </div>
                        <button className="deletebtn" onClick={() => deleteBook(book.id)}>
                            Delete Book
                        </button>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default AllBooks;