import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import "../css/Login.scss";
import { getAuth, signInWithPopup, GoogleAuthProvider,  onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";

const Login = () => {
    //login with google
    const [user, setUser] = useState(null);
    const auth = getAuth();

    //navigate to profile pagina after login
    const navigate = useNavigate();

    //login with email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        //als je bent ingelogd en als je op login klikt blijf je naar /profile gaan en kan je niet meer naar de login page
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                navigate("/profile"); // ← redirect after registration
            }
        });
        return () => unsubscribe();
    }, [auth, navigate]);

    //login google
    const handleGoogleLogin = () => {
        //login with google
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Loged in:", result.user);
                navigate("/profile"); // ← redirect na registratie
            })
            .catch((error) => {
                console.error("Error by login:", error.message);
            });
    };
    
    //login met email en password
    const handleEmailLogin = () => {
        //kijken of persoon in de database staat, zo ja word je ingelogd
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Loged in:", userCredential.user);
                navigate("/profile"); // ← redirect na registratie
            })
            .catch((error) => {
                console.error("Error by login:", error.message);
                alert("Error: " + error.message);
            });
    };

    //register met email/password
    const handleRegister = () => {
        //kijken of alles is ingevuld
        if (!email || !password) {
            alert("Enter email and your password.");
            return;
        }

        //kijken of de email wel geldig is
        if (!email.includes("@")) {
            alert("Enter an valid e-mailadres.");
            return;
        }

        //user word toegevoegd aan database bij register
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Registered:", userCredential.user);
                navigate("/profile"); // ← redirect na registratie
            })
            .catch((error) => {
                console.error("Wrong by register:", error.message);
                alert("Registrationerror: " + error.message);
            });
    };

    return (
        <div>
            <Nav />
            <div className="logedin">
                <div className="login">
                    <a className="titleloginemail">Login/Register with Email and Password</a>
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
                            Login with Email/Password
                        </button>
                        <button className="registeremail" onClick={handleRegister}>
                            Register with Email/Password
                        </button>
                    <a className="titlelogingoogle">Login met Google</a>
                    <button className="logingoogle" onClick={handleGoogleLogin}>
                        Login with Google
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;