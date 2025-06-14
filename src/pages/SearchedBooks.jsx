import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase"; 
import "../css/Search.scss";

const SearchedBooks = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search).get("q")?.toLowerCase() || "";
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const snapshot = await getDocs(collection(db, "Books")); // collectie heet 'books'
                const allBooks = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Filter client-side op title of author
                const filtered = allBooks.filter(book =>
                    book.title?.toLowerCase().includes(query) ||
                    book.author?.toLowerCase().includes(query)
                );

                setBooks(filtered);
            } catch (error) {
                console.error("Fout bij ophalen boeken:", error);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchBooks();
        }
    }, [query]);

    return (
        <div className="booksBackgroundWhite">
            <a className="searchText">Zoekresultaten voor: "{query}"</a>
            <div className="searchContainer">
               
                {loading ? (
                    <p>Bezig met laden...</p>
                ) : books.length > 0 ? (
                    books.map((book) => (
                <section key={book.id} className="searchFeed">
                    <div className="foundBook">
                        <div className="textBookBlock">
                            <a className="bookTextBold">Title: </a>
                            <a className="bookText">{book.title}</a>
                        </div>
                        <div className="textBookBlock">
                            <a className="bookTextBold">Author: </a>
                            <a className="bookText">{book.author}</a>
                        </div>
                        <div className="textBookBlock">
                            <a className="bookTextBold">Description: </a>
                            <a className="bookText">{book.description || "Geen beschrijving"}</a>
                        </div>
                    </div>
                </section>
            ))
            ) : (
            <p>Geen boeken gevonden.</p>
            )}
        </div>
    </div>
    );
};

export default SearchedBooks;