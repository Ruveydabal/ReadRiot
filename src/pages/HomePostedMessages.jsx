import "../css/Home.scss";
import React, { useEffect, useState } from 'react';
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase.jsx";
import { Link } from "react-router-dom";

const HomePostedMessages = () => {
    const [getMessages, SetGetMessages] = useState([]);
    const messages = collection(db, "Messages");

    const [getReactions, SetGetReactions] = useState([]);
    const reaction = collection(db, "Reactions");

    useEffect(() => {
        const getMessageDetails = async () => {
            const data = await getDocs(messages)
            SetGetMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        }
            getMessageDetails();
    }, [])

    useEffect(() => {
        const getReactionDetails = async () => {
            const data = await getDocs(reaction)
            SetGetReactions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        }
            getReactionDetails();
    }, [])

    const deleteBook = async (id) => {
        await deleteDoc(doc(collection(db, "Messages"), id));
    }

    return (
        <div className="homeBackgroundWhite">
            <div className="homeContainer">
                {getMessages && getMessages.map((message) => (
                <section className="homeFeed">
                    <div className="messageId" key={message.id}>   
                        <div className="messageBlock">
                            <div className="messageReactionTextBlock">
                                <a className="messageText">{message.message}</a>
                            </div>
                        </div>
                        {/* Delete */}
                        <button 
                            className="deletebtn"
                            onClick={async () => {
                                await deleteBook(message.id);
                                // Verwijder lokaal uit state na deleten
                                SetGetMessages(getMessages.filter((m) => m.id !== message.id));
                            }}
                        >
                            Delete Message
                        </button>
                    </div>
                      {getReactions.filter((reaction) => reaction.Message_id === message.id)
                      .map((reaction) => (
                            <div className="reactionId" key={reaction.id}>
                                <div className="reactionBlock"> 
                                    <div className="messageReactionTextBlock">
                                        <a className="messageText">{reaction.reaction}</a>
                                    </div>
                                </div>

                            </div>
                        ))}
                </section>
                ))}
                <div className="buttonmessage">
                    <div className="navLink">
                        <Link to={"/addmessage"} >
                            Add Message
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePostedMessages;