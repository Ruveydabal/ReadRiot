import "../css/Home.scss";
import React, { useEffect, useState } from 'react';
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../Firebase.jsx";

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
    })

 
    
    return (
        <div className="homeBackgroundWhite">
            <div className="homeContainer">
                {getMessages && getMessages.map((messages, index) => (
                <section className="homeFeed">
                    <div key={index}>   
                        <div className="messageBlock">
                            <div className="messageReactionTextBlock">
                                <a className="messageText">{messages.message}</a>
                            </div>
                            {/* message from database?? */}
                        </div>
                         {getReactions && getReactions.map((reaction) => (
                            <div className="reactionBlock">
                                <div className="messageReactionTextBlock">
                                <a className="messageText">{reaction.reaction}</a>
                                </div>
                            </div>
                          
                            ))}
                        
                    </div>
                </section>
                ))}
            </div>

            
        </div>
    );
};


export default HomePostedMessages;