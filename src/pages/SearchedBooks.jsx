import React, { useEffect, useState } from "react";
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
        <>
            {/* Laat het resultaat zien van wat je hebt ingvuld in de search */}
            <a className="searchedbooks">Zoekresultaten voor: "{query}"</a>
            <div className="backgroundsearchedbooks">
                {loading ? (
                    <p>Bezig met laden...</p>
                ) : books.length > 0 ? (
                    // kijkt of er boeken in staan anders gaat ie naar geen boeken gevonden
                    <ul className="allbookslist">
                        {books.map((book) => (
                            // de title en autheur komt tevoorschijn 
                            <li key={book.id} className="bookCard">
                                <p><strong>Title:</strong> {book.title}</p>
                                <p><strong>Auteur:</strong> {book.author}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    // voor als er geen boeken zijn gevonden, scss moet nog veranderd worden
                    <p>Geen boeken gevonden.</p>
                )}
            </div>
        </>
    );
};

export default SearchedBooks;