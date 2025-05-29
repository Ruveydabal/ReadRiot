import React, { use, useEffect, useState } from 'react'
import Nav from "./Nav.jsx";
import HomePostedMessages from "./HomePostedMessages.jsx";
import Footer from "./Footer.jsx";
import { getDocs, collection, doc, getFirestore, updateDoc } from "firebase/firestore";
import { db } from "../Firebase.jsx";

const Home = () => {
    // const [getBooks, setGetBooks] = useState([]);
    // const books = collection(db, "Books");

    // const [getTitle, setTitle] = useState("");
    // const [getAutheur, setAutheur] = useState("");
    // const [getOmschrijving, setOmschrijving] = useState("");
    // const [getDate, setDate] = useState("");

    // useEffect(() => {
    //     const getBookDetails = async () => {
    //         const data = await getDocs(books)
    //         setGetBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    //     }
    //     getBookDetails();
    // }, [])
    // console.log(getBooks);

    //vraag is alleen, hoe en waar roep ik dit aan
    const createBook = async () => {
        await addDoc(books,
            {
                title: getTitle,
                autheur: getAutheur,
                omschrijving: getOmschrijving,
                date: getDate,
            }
        );
        navigate('/')
    }

    const deleteBook = async (id) => {
        const postDoc = doc(db, "books", id);
        await deleteDoc(postDoc);
    }

    // const db = getFirestore();
    // const docRef = doc(db, "books", "//id")

    // const data = {
    //     //data die erin zit bv code: 163;
    // }

    // updateDoc(docRef, data).then(docRef => {
    //     console.log("testing this");
    // })
    // .catch(error => {
    //     console.log(error);
    // })
    
    return (
        <div>
            <Nav />
            <HomePostedMessages />
            <Footer />
        </div>
    )   
}

export default Home