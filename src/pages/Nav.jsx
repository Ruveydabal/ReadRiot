import React from "react";
import "../css/Nav.scss";
import Logo from "../images/LogoReadRiot.png";
import { Link } from "react-router-dom";

const Nav = () => {
    return(
        <nav>
            <div className="backgroundNav">
                <div className="logo">
                    <img className="img" src={Logo} alt="Logo"/>
                </div>
                <div className="navLinkContainer">
                    <div className="navLink">
                        <Link to={"Home.jsx"} >
                            Home
                        </Link>
                    </div>
                    <div className="navLink">
                        <Link to={"/Favorite.jsx"} >
                            Favorites
                        </Link>
                    </div>
                    <div className="navLink">
                        <a>Friends</a>
                    </div>
                    <div className="navLink">
                        <a>Login</a>
                    </div>
                </div>
                <div className="searchContainer">
                    <div className="search">

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;