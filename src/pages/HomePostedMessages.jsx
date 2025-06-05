import "../css/Home.scss";
import React, { useEffect, useState } from 'react';
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../Firebase.jsx";

const HomePostedMessages = () => {
    const [getMessages, SetGetMessages] = useState([]);
    const messages = collection(db, "Messages");

    // const [getReaction, SetGetReaction] = useState([]);
    // const reaction = collection(db, "reaction");

    useEffect(() => {
        const getMessageDetails = async () => {
            const data = await getDocs(message)
            SetGetMessage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        }
            getMessageDetails();
    }, [])

    // useEffect(() => {
    //     const getReactionDetails = async () => {
    //         const data = await getDocs(reaction)
    //         SetGetReaction(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    //     }
    //         SetGetReaction();
    // })

    console.log(getMessage);
    
    return (
        <div className="homeBackgroundWhite">
            <div className="homeContainer">
                {getMessage && getMessage.map((message, index) => (
                <section className="homeFeed">
                    <div key={index}>   
                        <div className="messageBlock">
                            <div className="messageTextBlock">
                                <a className="messageTextBold">{message.message}</a>
                            </div>
                            {/* message from database?? */}
                        </div>
                        <div className="reactionBlock">
                            {/* rections from database?? */}
                        </div>
                    </div>
                </section>
                ))}
            </div>
        </div>
    );
};

export default HomePostedMessages;