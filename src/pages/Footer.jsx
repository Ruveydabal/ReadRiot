import "../css/Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="backgroundFooter">
                <div className="footerdetails">
                    <div className="contact">
                        {/* Contact text */}
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
                    {/* Add Book button in footer, can be added at all times */}
                    <div className="buttonfooter">
                        <div className="navLink">
                            <Link to={"/addbook"} >
                                Add Book
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;