import Nav from "./Nav.jsx";
import SearchedBooks from './SearchedBooks.jsx';
import Footer from './Footer.jsx';

const SearchPage = () => {
    return (
        <div>
            <Nav />
            {/* haalt de informatie van SearchedBooks vandaan */}
            <SearchedBooks />
            <Footer />
        </div>
    )
}

export default SearchPage;