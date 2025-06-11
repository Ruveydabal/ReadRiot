import React from 'react';
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import "../css/Profile.scss";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProfileDetails = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (!currentUser) {
                navigate("/login"); 
            } else {
                setUser(currentUser);
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Uitgelogd");
                navigate("/login"); 
            })
            .catch((error) => {
                console.error("Fout bij uitloggen:", error.message);
            });
    };

    return (
        <>
            <Nav />
            
            <div className="backgroundprofile">
                <button className="logout" onClick={handleLogout}>
                    Uitloggen
                </button>
            </div>
                
            <Footer />
        </>
    )
}

export default ProfileDetails;