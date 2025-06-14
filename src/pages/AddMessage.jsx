import { useState } from "react";
import "../css/Books.scss";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { db } from "../Firebase.jsx";

const AddMessage = () => {
    const messages = collection(db, "Messages");
    const navigate = useNavigate();
    
    //informatie 
    const [getMessage, setMessage] = useState({
        message: "",
    })
    
    //create message 
    const createMessage = async () => {
        try {
            await addDoc(messages, {
                message: getMessage.message,
            });
            //als alles ingevuld is word je terug gestuurd naar de home pagina
            navigate("/");
        } catch (error) {
            //error handeling
            console.error("Fout bij toevoegen message:", error);
            alert("Er ging iets mis bij het toevoegen van een message.");
        }
    };

    return (
        <>
            <Nav />

            <div className="background">
                <div className="addToDatabase">
                    <div className="alignitemsdatabase">
                        <div className="addTitle">
                            {/* input message */}
                            <input
                                className="message"
                                type="text" 
                                placeholder="Add Message..."
                                value={getMessage.message}
                                onChange={(e) => setMessage({ message: e.target.value })}
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
                            <button className="addbtn" onClick={createMessage}> 
                                Add Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </>
    );
}

export default AddMessage;