import React from "react";
import "../css/Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="backgroundFooter">
                <div className="footerdetails">
                    <div className="contact">
                        <a>
                            Contact
                        </a>
                        <a>
                            Email for complains: 
                        </a>
                        <a>
                            Email for errors: 
                        </a>
                    </div>
                    <div className="buttonfooter">
                        <div className="navLink">
                            <Link to={"/addbook"} >
                                AddBoek
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;