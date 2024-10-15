const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookHeader } from "../cmps/BookHeader.jsx"
import { AppLoader } from '../../../cmps/AppLoader.jsx'

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [isFilterVisible, setFilterVisible] = useState(false);



    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService
            .query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Problems getting books:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService
            .remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
                showSuccessMsg(`Car removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing book:', err)
                showErrorMsg(`Problems removing book (${bookId})`)
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    const onToggleFilterVisibility = () => {
        setFilterVisible((prev) => !prev);
    };


    if (!books) return <AppLoader />
    return (
        <section className="book-index">
            <section className="book-header">

            </section>
            <div>

                <div className="filter-toggle-area">
                    <button
                        className="filter-toggle-button"
                        onClick={onToggleFilterVisibility}
                        aria-label={isFilterVisible ? "Hide Filters" : "Show Filters"}
                    >
                        {isFilterVisible ? "Hide Filter" : "Show Filter"}
                    </button>
                </div>
                {isFilterVisible && <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />}
            </div>
            <div className="book-body">
                <div>
                    <Link to="/book/edit"><button className='add-book'>Add Book</button></Link>
                </div>
                <BookList books={books} onRemoveBook={onRemoveBook} />
            </div>
        </section>
    )
}