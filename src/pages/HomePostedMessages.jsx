import "../css/Home.scss";
import { useEffect, useState } from 'react';
import { getDocs, collection, doc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../Firebase.jsx";
import { Link } from "react-router-dom";

const HomePostedMessages = () => {
    // Messages state
    const [getMessages, setGetMessages] = useState([]);
    const messagesCollection = collection(db, "Messages");

    // Reactions state
    const [getReactions, setGetReactions] = useState([]);
    const reactionsCollection = collection(db, "Reactions");

    // Input state per message
    const [reactionsInput, setReactionsInput] = useState({});

    // Fetch all messages
    useEffect(() => {
        const fetchMessages = async () => {
            const data = await getDocs(messagesCollection);
            setGetMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchMessages();
    }, []);

    // Fetch all reactions
    useEffect(() => {
        const fetchReactions = async () => {
            const data = await getDocs(reactionsCollection);
            setGetReactions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchReactions();
    }, []);

    // Delete a message
    const deleteMsg = async (id) => {
        await deleteDoc(doc(db, "Messages", id));
        setGetMessages(getMessages.filter((m) => m.id !== id));
        // Optionally delete reactions related to this message
    };

    // Create a reaction
    const createReaction = async (messageId) => {
        const text = reactionsInput[messageId]?.trim();
        if (!text) return;

        const newDoc = await addDoc(reactionsCollection, {
            reaction: text,
            message_id: messageId
        });

        // Add to local state without full reload
        setGetReactions([
            ...getReactions,
            { id: newDoc.id, reaction: text, message_id: messageId }
        ]);

        // Clear input
        setReactionsInput({ ...reactionsInput, [messageId]: "" });
    };

    return (
        <div className="homeBackgroundWhite">
            <div className="homeContainer">
                {getMessages.map((message) => (
                    <section className="homeFeed" key={message.id}>
                        <div className="messagereaction">
                            <div className="messageId">   
                                <div className="messageBlock">
                                    <div className="messageReactionTextBlock">
                                        <div className="messageText">{message.message}</div>
                                    </div>
                                </div>
                                <button 
                                    className="deletebtn"
                                    onClick={() => deleteMsg(message.id)}
                                >
                                    Delete Message
                                </button>
                            </div>

                            {/* Reactions for this message */}
                            {getReactions
                                .filter((reaction) => reaction.message_id === message.id)
                                .map((reaction) => (
                                    <div className="reactioncolumn">
                                        <div className="reactionId" key={reaction.id}>
                                            <div className="reactionBlock"> 
                                                <div className="messageReactionTextBlock">
                                                    <div className="messageText">{reaction.reaction}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* Add reaction */}
                        <div className="sendreaction">
                            <div className="addReaction">
                                <input
                                    className="reaction"
                                    type="text"
                                    placeholder="Type a reaction..."
                                    value={reactionsInput[message.id] || ""}
                                    onChange={(e) =>
                                        setReactionsInput({
                                            ...reactionsInput,
                                            [message.id]: e.target.value
                                        })
                                    }
                                />
                                <button onClick={() => createReaction(message.id)}>Send</button>
                            </div>
                        </div>
                    </section>
                ))}

                <div className="buttonmessage">
                    <div className="navLink">
                        <Link to="/addmessage">
                            Add Message
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePostedMessages;