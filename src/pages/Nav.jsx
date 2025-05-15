import React from "react";
import "../css/Nav.scss";
import Logo from "../images/LogoReadRiot.png";

const Nav = () => {
    return(
        <nav>
            <div className="backgroundNav">
                <div className="logo">
                    <img className="img" src={Logo} alt="Logo"/>
                </div>
                <div className="navLinkContainer">
                    <div className="navLink">
                        <a>Home</a>
                    </div>
                    <div className="navLink">
                        <a>Favorites</a>
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