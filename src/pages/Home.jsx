import React, { useEffect, useState } from 'react'
import Nav from "./Nav.jsx";
import HomePostedMessages from "./HomePostedMessages.jsx";
import Footer from "./Footer.jsx";
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../Firebase.jsx";

const Home = () => {
    const [getBooks, setGetBooks] = useState([]);
    const books = collection(db, "Boeken");

    useEffect(() => {
        const getBookDetails = async () => {
            const data = await getDocs(books)
            setGetBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        }
        getBookDetails();
        
    }, [])
    console.log(getBooks);

    return (
        <div>
            <Nav />
            <HomePostedMessages />
            <Footer />
        </div>
    )   
}

export default Home