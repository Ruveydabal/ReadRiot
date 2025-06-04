import "../css/Favorite.scss";
import React, { useEffect, useState } from 'react';
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../Firebase.jsx";


const AllBooks = ({books}) => {
    const [getBooks, setGetBooks] = useState([]);
    const book = collection(db, "Books");
    
    // const [getTitle, setTitle] = useState("");
    // const [getAutheur, setAutheur] = useState("");
    // const [getOmschrijving, setOmschrijving] = useState("");
    // const [getDate, setDate] = useState("");
    
    
        useEffect(() => {
            const getBookDetails = async () => {
                const data = await getDocs(book)
                setGetBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
            }
            getBookDetails();
        }, [])
      

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
  console.log(getBooks);
   
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
                </section>
            ))}
        </div>
    </div>
);
}

export default AllBooks;