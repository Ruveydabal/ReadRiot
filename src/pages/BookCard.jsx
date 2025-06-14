import "../css/Books.scss";
 
//de kaarten/namen op de home pagina
const BookCard = ({ data }) => {
    return (    
        <div className="bookCard">
            <h4 className="book-name">{data.title}</h4>
        </div> 
    )
}
 
export default BookCard;