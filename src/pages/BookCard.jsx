import "../css/Books.scss";
 
//the names/cards on the home page
const BookCard = ({ data }) => {
    return (    
        <div className="bookCard">
            <h4 className="book-name">{data.title}</h4>
        </div> 
    )
}
 
export default BookCard;