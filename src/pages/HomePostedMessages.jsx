import "../css/Home.scss";
import { useEffect, useState } from 'react';
import { getDocs, collection, doc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../Firebase.jsx";
import { Link } from "react-router-dom";

const HomePostedMessages = () => {
    const [getMessages, setGetMessages] = useState([]);
    const [getReactions, setGetReactions] = useState([]);
    const [reactionsInput, setReactionsInput] = useState({});

    const messagesCollection = collection(db, "Messages");
    const reactionsCollection = collection(db, "Reactions");

    useEffect(() => {
        const fetchMessages = async () => {
            const data = await getDocs(messagesCollection);
            setGetMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchMessages();
    }, []);

    useEffect(() => {
        const fetchReactions = async () => {
            const data = await getDocs(reactionsCollection);
            setGetReactions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchReactions();
    }, []);

    const deleteMsg = async (id) => {
        await deleteDoc(doc(db, "Messages", id));
        setGetMessages(getMessages.filter((m) => m.id !== id));
        // Optional: filter out reactions here if desired
    };

    const createReaction = async (messageId) => {
        const text = reactionsInput[messageId]?.trim();
        if (!text) return;

        const newDoc = await addDoc(reactionsCollection, {
            reaction: text,
            message_id: messageId
        });

        setGetReactions([
            ...getReactions,
            { id: newDoc.id, reaction: text, message_id: messageId }
        ]);

        setReactionsInput({ ...reactionsInput, [messageId]: "" });
    };

    return (
        <div className="homeBackgroundWhite">
            <div className="homeContainer">
                {getMessages.map((message) => (
                    <section className="homeFeed" key={message.id}>
                        <div className="messageId">
                            <div className="messageBlock">
                                <div className="messageReactionTextBlock">
                                    <div className="messageText">{message.message}</div>
                                </div>
                            </div>

                            <div className="messageButtons">
                                <button
                                    className="deletebtn"
                                    onClick={() => deleteMsg(message.id)}
                                >
                                    Delete Message
                                </button>

                                <button
                                    className="likebtn"
                                    onClick={() => {
                                        setGetMessages(prev =>
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

                        {/* Reactions */}
                        {getReactions
                            .filter((reaction) => reaction.message_id === message.id)
                            .map((reaction) => (
                                <div className="reactioncolumn" key={reaction.id}>
                                    <div className="reactionId">
                                        <div className="reactionBlock">
                                            <div className="messageReactionTextBlock">
                                                <div className="messageText">{reaction.reaction}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

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
                        <Link to={"/addMessage"}>
                            Add Message
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePostedMessages;
