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

    //zorgt er voor dat je altijd naar profile gaat als je bent ingelogd
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

    //zorgt ervoor dat je kan uitloggen
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
        <div className="homeBackgroundWhite">
            <div className="backgroundprofile">
               
                {/* Laat de naam zien waarbij je mee bent ingelogd */}
                {user && (
                    <div className="profileFeed">
                        <div className="profileTextBlock">
                            <a className="profileText">{user.email}</a>
                        </div>
                        <div className="profileTextBlock">
                            <a className="profileText">{user.displayName}</a>
                        </div>
                        <div className="profileTextBlock">
                            <a className="profileText">{user.biographie}</a>
                        </div>
                    </div>
                )}
                {/* Button met logout zodat je kan uitloggen als je bent ingelogd */}
                <button className="logout" onClick={handleLogout}>
                    Log out
                </button>
            </div>
        </div>
                
            <Footer />
        </>
    )
}

export default ProfileDetails;