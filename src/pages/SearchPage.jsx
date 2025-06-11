import React from 'react';
import Nav from "./Nav.jsx";
import SearchedBooks from './SearchedBooks.jsx';
import Footer from './Footer.jsx';

const SearchPage = () => {
    return (
        <div>
            <Nav />
            <SearchedBooks />
            <Footer />
        </div>
    )
}

export default SearchPage;