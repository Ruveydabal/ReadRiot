import { useState } from "react";
import "../css/Nav.scss";
import Logo from "../images/LogoReadRiot.png";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    //Search zoekt alleen als je op enter hebt geklikt
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            if (query.trim() !== "") {
                navigate(`/search?q=${encodeURIComponent(query)}`);
                setQuery("");
            }
        }
    };

    return(
        <nav>
            <div className="backgroundNav">
                {/* Logo van onze applicatie */}
                <div className="logo">
                    <img className="img" src={Logo} alt="Logo"/>
                </div>
                {/* Nav links bovenin */}
                <div className="navLinkContainer">
                    <div className="above">
                        <div className="navLink">
                            <Link to={"/"} >
                                Home
                            </Link>
                        </div>
                        <div className="navLink">
                            <Link to={"/books"} >
                                Books
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
                    {/* search query */}
                    <div className="searchContainer">
                        <input
                            className="search"
                            type="text"
                            placeholder="Search by name or author"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>
            </div>  
        </nav>
    );
};

export default Nav;