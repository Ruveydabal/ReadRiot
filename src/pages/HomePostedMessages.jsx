import "../css/Home.scss";
import { useEffect, useState } from 'react';
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase.jsx";
import { Link } from "react-router-dom";

const HomePostedMessages = () => {
    //message
    const [getMessages, SetGetMessages] = useState([]);
    const messages = collection(db, "Messages");

    //reaction
    const [getReactions, SetGetReactions] = useState([]);
    const reaction = collection(db, "Reactions");

    //all the messages 
    useEffect(() => {
        const getMessageDetails = async () => {
            const data = await getDocs(messages)
            SetGetMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        }
            getMessageDetails();
    }, [])

    //all the reactions
    useEffect(() => {
        const getReactionDetails = async () => {
            const data = await getDocs(reaction)
            SetGetReactions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        }
            getReactionDetails();
    }, [])

    //deleting message
    const deletemsg = async (id) => {
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
                        <div className="messageButtons">
                            <button 
                                className="deletebtn"
                                onClick={async () => {
                                    await deletemsg(message.id);
                                    SetGetMessages(getMessages.filter((m) => m.id !== message.id));
                                }}
                            >
                                Delete Message
                            </button>

                            <button 
                                className="likebtn"
                                onClick={() => {
                                    SetGetMessages(prev =>
                                        prev.map(m =>
                                            m.id === message.id
                                                ? { ...m, likes: (m.likes || 0) + 1 }
                                                : m
                                        )
                                    );
                                }}
                            >
                                Like {message.likes || 0}
                            </button>
                        </div>

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
                        <Link to={"/addMessage"} >
                            Add Message
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePostedMessages;