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
                        <Link to={"/"} >
                            Home
                        </Link>
                    </div>
                    <div className="navLink">
                        <Link to={"/favorite"} >
                            Favorites
                        </Link>
                    </div>
                    <div className="navLink">
                        <Link to={"/friends"} >
                            Friends
                        </Link>
                    </div>
                    <div className="navLink">
                        <Link to={"/login"} >
                            Login
                        </Link>
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