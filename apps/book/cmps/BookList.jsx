const { Link } = ReactRouterDOM
import { BookPreview } from '../cmps/BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {
    return (
        <div className="books-list">
            <div className="book-list-ul">
                {books.map(book => (
                    <li key={book.id}>
                        <BookPreview book={book} />
                        <button  onClick={() => onRemoveBook(book.id)} className="close-book  btn-list">
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                        {/* <button onClick={() => onSelectedBookId(book.id)}>Details</button> */}
                        <nav className="book-nav">
                            <Link to={`/book/${book.id}`}>
                                <button className="btn-list">
                                    <i className="fa-solid fa-circle-info"></i>Details
                                </button>
                            </Link>
                            <Link to={`/book/edit/${book.id}`}>
                                <button className="btn-list">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                            </Link>
                        </nav>
                    </li>
                ))}
            </div>
        </div>
    )
}