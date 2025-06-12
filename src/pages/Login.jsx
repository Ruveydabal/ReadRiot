import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import "../css/Login.scss";
import { getAuth, signInWithPopup, GoogleAuthProvider,  onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";

const Login = () => {

    //inloggen met google
    const [user, setUser] = useState(null);
    const auth = getAuth();

    //navigate naar profile pagina na inloggen
    const navigate = useNavigate();

    //inloggen met email en password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        //als je bent ingelogd en als je op login klikt blijf je naar /profile gaan en kan je niet meer naar de login page
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                navigate("/profile"); // ← redirect na registratie
            }
        });
        return () => unsubscribe();
    }, [auth, navigate]);

    //google
    const handleGoogleLogin = () => {
        //inloggen met google
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Ingelogd:", result.user);
                navigate("/profile"); // ← redirect na registratie
            })
            .catch((error) => {
                console.error("Fout bij inloggen:", error.message);
            });
    };
    
    //login met email en password
    const handleEmailLogin = () => {
        //kijken of persoon in de database staat, zo ja word je ingelogd
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Ingelogd:", userCredential.user);
                navigate("/profile"); // ← redirect na registratie
            })
            .catch((error) => {
                console.error("Fout bij inloggen:", error.message);
                alert("Fout: " + error.message);
            });
    };

    //register met email/password
    const handleRegister = () => {
        //kijken of alles is ingevuld
        if (!email || !password) {
            alert("Vul zowel e-mail als wachtwoord in.");
            return;
        }

        //kijken of de email wel geldig is
        if (!email.includes("@")) {
            alert("Voer een geldig e-mailadres in.");
            return;
        }

        //user word toegevoegd aan database bij register
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Geregistreerd:", userCredential.user);
                navigate("/profile"); // ← redirect na registratie
            })
            .catch((error) => {
                console.error("Fout bij registreren:", error.message);
                alert("Registratiefout: " + error.message);
            });
    };

    return (
        <div>
            <Nav />
            <div className="logedin">
                {/* {user ? (
                    <div className="profileinfo">
                        {user.photoURL && (
                            <img
                                src={user.photoURL}
                                alt="Profielfoto"
                                style={{ width: 100, borderRadius: "50%" }}
                            />
                        )}
                        <h2 className="infodisplay">Welkom {user.displayName}!</h2>
                        <br />
                        <button className="logout" onClick={handleLogout}>
                            Uitloggen
                        </button>
                    </div> */}
                {/* ) : ( */}
                
                    <div className="login">
                        <a className="titleloginemail">Login/Register met Email and Password</a>
                            <input
                                className="inputfieldemail"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="inputfieldpassword"
                                type="password"
                                placeholder="Wachtwoord"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="loginemail" onClick={handleEmailLogin}>
                                Inloggen met Email/Password
                            </button>
                            <button className="registeremail" onClick={handleRegister}>
                                Registreren met Email/Password
                            </button>
                        <a className="titlelogingoogle">Login met Google</a>
                        <button className="logingoogle" onClick={handleGoogleLogin}>
                            Inloggen met Google
                        </button>
                    </div>
                {/* )} */}
            </div>
            <Footer />
        </div>
    );
};

export default Login;