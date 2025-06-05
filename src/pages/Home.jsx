import React, { use, useEffect, useState } from 'react'
import Nav from "./Nav.jsx";
import HomePostedMessages from "./HomePostedMessages.jsx";
import Footer from "./Footer.jsx";
import { getDocs, collection, doc, getFirestore, updateDoc } from "firebase/firestore";
import { db } from "../Firebase.jsx";

const Home = () => {

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