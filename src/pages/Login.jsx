import { useEffect, useState } from "react";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import "../css/Login.scss";
import { getAuth, signInWithPopup, GoogleAuthProvider,  onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";


const Login = () => {
    //inloggen met google
    const [user, setUser] = useState(null);
    const auth = getAuth();

    //inloggen met email en password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //google
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [auth]);

    //google
    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Ingelogd:", result.user);
            })
            .catch((error) => {
                console.error("Fout bij inloggen:", error.message);
            });
    };

    //google
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Uitgelogd");
            })
            .catch((error) => {
                console.error("Fout bij uitloggen:", error.message);
            });
    };
    
    //login met email en password
    const handleEmailLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Ingelogd:", userCredential.user);
            })
            .catch((error) => {
                console.error("Fout bij inloggen:", error.message);
                alert("Fout: " + error.message);
            });
    };

    //register met email/password
    const handleRegister = () => {
        if (!email || !password) {
            alert("Vul zowel e-mail als wachtwoord in.");
            return;
        }

        if (!email.includes("@")) {
            alert("Voer een geldig e-mailadres in.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Geregistreerd:", userCredential.user);
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
                {user ? (
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
                    </div>
                ) : (
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
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Login;