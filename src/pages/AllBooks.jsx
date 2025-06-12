import "../css/Favorite.scss";
import React, { useEffect, useState } from 'react';
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase.jsx";

const AllBooks = ({books}) => {
    const [getBooks, setGetBooks] = useState([]);
    const book = collection(db, "Books");
    
    //alle details van het boek
    useEffect(() => {
        const getBookDetails = async () => {
            const data = await getDocs(book)
            setGetBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        }
        getBookDetails();
    }, []);
    
    //delete book functie
    const deleteBook = async (id) => {
        await deleteDoc(doc(collection(db, "Books"), id));
    }
   
    return (
        <div className="booksBackgroundWhite">
            <div className="booksContainer">
                {getBooks && getBooks.map((book, index) => (
                    <section className="booksFeed">
                        <div key={index}>     
                            {/* Boek titel */}
                            <div className="bookTextBlock">
                                <a className="bookTextBold">{book.title}</a>
                            </div>
                            {/* Boek autheur */}
                            <div className="bookTextBlock">
                                    <a className="bookTextBold">Author: </a> 
                                    <a className="bookText">{book.author}</a>
                            </div> 
                            {/* Boek omschrijving */}
                            <div className="bookTextBlock">
                                <a className="bookTextBold">Description: </a> 
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