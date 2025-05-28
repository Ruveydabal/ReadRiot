import Nav from "./Nav.jsx";
import AllBooksSameAutheur from "./AllBooksSameAutheur.jsx";
import Footer from "./Footer.jsx";
import "../css/Books.scss";

const BookDetailsPage = () => {

    return (
        <div>
            <Nav />

            <AllBooksSameAutheur />
            <Footer />
        </div>
    )   
}

export default BookDetailsPage;