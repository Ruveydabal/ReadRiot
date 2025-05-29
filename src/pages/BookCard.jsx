import React from "react";
import "../css/Books.scss";
 
//de kaarten/namen op de home pagina
const BookCard = ({ data }) => {
    //data.url er word er vanuit gegaan dat data een object is dat een url heeft
    //split('/') neemt een scheidingsmethode en "splitst" de string in meerdere delen
    //voorbeeld "https:", "", "pokeapi.co", "api", "v2", "pokemon", "id", ""
    //resultaat van split word opgelagen in constate urlParts
    //de laatste kan je gebruiken
   // const urlParts = data.url.split("/");
    //const bookId = urlParts[urlParts.length - 2];
 
    

    return (    
        <div className="bookCard">
            <h4 className="book-name">{data.title}</h4>
        </div> 
    )
}
 
export default BookCard;