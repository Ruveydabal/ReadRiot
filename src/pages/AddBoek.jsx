import React, { useState } from "react";
import "../css/Books.scss";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import "../css/Footer.scss";
import { getDocs, collection, doc, getFirestore, updateDoc, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { db } from "../Firebase.jsx";

const AddBoek = () => {
    const navigate = useNavigate();

    const book = collection(db, "Books"); 

    const [getInfo, setInfo] = useState({
        title: "",
        author: "",
        description: ""
    })

    const createBook = async () => {
        await addDoc(book,
            {
                title: getInfo.title,
                autheur: getInfo.author,
                omschrijving: getInfo.description,
            }
        );
    }

    return (
        <>
            <Nav />

            <div className="background">
                <div className="addToDatabase">
                    <div className="alignitemsdatabase">
                        <div className="addTitle">
                            <input 
                                className="titlebook"
                                type="text" 
                                placeholder="Titel"
                                value={getInfo.title}
                                onChange={(e) => setInfo({ ...getInfo, title: e.target.value })}
                            />
                        </div>

                        <div className="addAuthor">
                            <input 
                                className="authorbook"
                                type="text" 
                                placeholder="Autor"
                                value={getInfo.author}
                                onChange={(e) => setInfo({ ...getInfo, author: e.target.value })}
                            />
                        </div>

                        <div className="addDescription">
                            <textarea 
                                className="descriptionbook"
                                placeholder="Description"
                                value={getInfo.description}
                                onChange={(e) => setInfo({ ...getInfo, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="buttondetails">
                        <div className="btns">
                            <button className="cancelbtn" onClick={() => navigate("/")}> 
                                Cancel
                            </button>
                            <button className="addbtn" onClick={createBook}> 
                                Add Book
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </>
    );
}

export default AddBoek;