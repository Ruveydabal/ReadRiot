import { useState } from "react";
import "../css/Books.scss";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import "../css/Footer.scss";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { db } from "../Firebase.jsx";

const AddBoek = () => {
    const navigate = useNavigate();

    const book = collection(db, "Books"); 

    //informatie 
    const [getInfo, setInfo] = useState({
        title: "",
        author: "",
        description: ""
    })

    const createBook = async () => {
        try {
            //checks if everything is filled in
            if (!getInfo.title || !getInfo.author || !getInfo.description) {
                alert("Enter all fields.");
                return;
            }
            await addDoc(book, {
                title: getInfo.title,
                author: getInfo.author,
                description: getInfo.description,
            });
            //goes back to the home page after confirm
            navigate("/");
        } catch (error) {
            //error handeling
            console.error("Error by adding book:", error);
            alert("Something went wrong while adding the book.");
        }
    };

    return (
        <>
            <Nav />

            <div className="background">
                <div className="addToDatabase">
                    <div className="alignitemsdatabase">
                        <div className="addTitle">
                            {/* input titel book */}
                            <input 
                                className="titlebook"
                                type="text" 
                                placeholder="Titel"
                                value={getInfo.title}
                                onChange={(e) => setInfo({ ...getInfo, title: e.target.value })}
                            />
                        </div>
                        {/* input author book */}
                        <div className="addAuthor">
                            <input 
                                className="authorbook"
                                type="text" 
                                placeholder="Author"
                                value={getInfo.author}
                                onChange={(e) => setInfo({ ...getInfo, author: e.target.value })}
                            />
                        </div>
                        {/* input description book */}
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
                            {/* cancel button brengt je terug naar home */}
                            <button className="cancelbtn" onClick={() => navigate("/")}> 
                                Cancel
                            </button>
                            {/* add button brengt je terug naar home */}
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