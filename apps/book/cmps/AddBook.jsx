const { useState, useRef } = React
const { useNavigate } = ReactRouter

import { bookService } from '../services/book.service.js'
import { debounce } from '../../../services/util.service.js'
import { SearchBooksList } from '../cmps/SearchBooksList.jsx'

export function AddBook() {
    const [booksList, setBooksList] = useState()
    const handleSearchDebounce = useRef(debounce(handleSearch, 2000))
    const navigate = useNavigate()

    function handleSearch({ target }) {
        bookService.getGoogleBooks(target.value).then(books => setBooksList(books))
    }

    function onSave(book) {
        bookService
            .addGoogleBook(book)
            .then(() => showSuccessMsg('Book has successfully saved!'))
            .catch(() => showErrorMsg(`couldn't save book`))
            .finally(() => navigate('/book'))
    }

    return (
        <div className="book-search">
            <div className="add-book-title">
                <span className="bold-txt-book">Google Search: </span>
                <input
                    onChange={handleSearchDebounce.current}
                    type="text"
                    name="title"
                    placeholder="Insert book name"
                />
                <button>Reset</button>
            </div>
            {booksList && <SearchBooksList booksList={booksList} onSave={onSave} />}
        </div>
    )
}