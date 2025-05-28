import "../css/Favorite.scss";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../Firebase.jsx";
import BookCard from "./BookCard.jsx";

const FavoriteBooks = ({books}) => {
    const [getBooks, setGetBooks] = useState([]);
    const book = collection(db, "Books");
    
    const [getTitle, setTitle] = useState("");
    const [getAutheur, setAutheur] = useState("");
    const [getOmschrijving, setOmschrijving] = useState("");
    const [getDate, setDate] = useState("");
    
    
        useEffect(() => {
            const getBookDetails = async () => {
                const data = await getDocs(book)
                setGetBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
            }
            getBookDetails();
        }, [])
        console.log(getBooks);

    // return (
    //     <div className="background">
    //         <div className="backgroundbooks">
    //             <section className="booksFeed">
    //                 {getBooks?.map((book)=>(
    //                 <Link to={`/${book.title}`} key={book.id}>
    //                     <BookCard data={book} />
    //                 </Link>
    //                 ))}
    //             </section>
    //         </div>
    //     </div>
    // )

    const firstBook = getBooks[3];
return (
  <div>
   <section className="booksFeed">
        {firstBook && (
        <div key={firstBook.docId}>
            <h2>{firstBook.title}</h2>
            <p><strong>Auteur:</strong> {firstBook.author}</p>
            <p><strong>Beschrijving:</strong> {firstBook.description}</p>
        </div>
        )}
    </section>
  </div>
);
}

export default FavoriteBooks;