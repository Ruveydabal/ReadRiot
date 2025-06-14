import "../css/Friends.scss";
import { useEffect, useState } from 'react';
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../Firebase.jsx";

const AllFriends = () => {
    const [getUser, SetGetUser] = useState([]);
    const user = collection(db, "User");

    useEffect(() => {
                const getUserDetails = async () => {
                    const data = await getDocs(user)
                    SetGetUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                }
                getUserDetails();
            }, [])

     console.log(getUser);

    return (
        <div className="userBackgroundWhite">
            <div className="userContainer">
                 {getUser && getUser.map((user, index) => (
                <section className="userFeed">
                    <div key={index}>     
                        <div className="userTextBlock">
                            <a className="userTextBold">{user.profileName}</a>
                        </div>
                        <div className="userTextBlock">
                            <a className="userTextBold">name: </a> 
                            <a className="userText">{user.name}</a>
                        </div> 
                        <div className="userTextBlock">
                            <a className="userTextBold">biography: </a> 
                            <a className="userText">{user.biography}</a>
                        </div>
                    </div>
                </section>
            ))}
            </div>
        </div>
    )
}

export default AllFriends;