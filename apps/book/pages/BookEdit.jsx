const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'
import { AddBook } from '../cmps/AddBook.jsx'
// import { AppLoader } from './AppLoader.jsx'

export function BookEdit() {
    // const [bookToEdit, setBookToEdit] = useState(null)
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const { bookId } = useParams()
    const navigate = useNavigate()

    console.log('bookId', bookId, 'bookToEdit', bookToEdit)

    useEffect(() => {
        console.log('fff')
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService
            .get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.error('Had issues loading book edit', err)
                navigate('/book')
            })
    }

    function handleChange({ target }) {
        const { name: field, type } = target
        console.log(target.name)

        let { value } = target

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }
        console.log(value)

        if (field === 'listPrice') {
            setBookToEdit(prevBook => ({
                ...prevBook,
                listPrice: { ...prevBook.listPrice, amount: value },
            }))
        } else {
            setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        }
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService
            .save(bookToEdit)
            .then(book => { })
            .catch(err => {
                console.log('err:', err)
            })
            .finally(() => {
                navigate('/book')
            })
    }

    const { title, authors, listPrice, description, publishedDate, categories, isOnSale } = bookToEdit
    // function isValidFilter() {
    //     return (
    //         title ||
    //         categories ||
    //         typeof isOnSale === 'boolean' ||
    //         (typeof listPrice.amount === 'number' && listPrice.amount >= 0)
    //     )
    // }
    // if (!bookToEdit) return <AppLoader />

    return (
        <section className="book-wrapper ">
            <section className="book-edit">
                <h1>{bookToEdit.id ? 'Edit' : 'Add'} Book</h1>
                <AddBook />
                <form onSubmit={onSaveBook} className='book-edit-form'>
                    <label className="bold-txt-book" htmlFor="title">
                        Title:
                    </label>
                    <input type="text" id="title" name="title" value={title} onChange={handleChange} />

                    <label className="bold-txt-book" htmlFor="authors">
                        Authors:
                    </label>
                    <input type="text" id="authors" name="authors" value={authors} onChange={handleChange} required />
                    <label className="bold-txt-book" htmlFor="price">
                        Price:
                    </label>
                    <input type="number" id="price" name="listPrice" value={listPrice.amount} onChange={handleChange} />

                    <label className="bold-txt-book" htmlFor="description">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        required></textarea>

                    <label className="bold-txt-book" htmlFor="publishedDate">
                        Published Date:
                    </label>
                    <input
                        type="number"
                        id="publishedDate"
                        name="publishedDate"
                        value={publishedDate}
                        onChange={handleChange}
                        required
                    />

                    <label className="bold-txt-book" htmlFor="categories">
                        Category:{' '}
                    </label>
                    <select id="categories" name="categories" value={categories} onChange={handleChange}>
                        <option value="">Select Category</option>
                        <option value="Computers">Computers</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Love">Love</option>
                        <option value="Poetry">Poetry</option>
                        <option value="Religion">Religion</option>
                    </select>

                    <label className="bold-txt-book" htmlFor="isOnSale">
                        On Sale:
                    </label>
                    <input
                        type="checkbox"
                        id="isOnSale"
                        name="listPrice.isOnSale"
                        checked={isOnSale}
                        onChange={handleChange}
                    />

                    <div className="form-actions-book">
                        <button className='btn-edit'>Save</button>
                        <button type="button" className='btn-edit'>
                            <Link to="/book">Back</Link>
                        </button>
                    </div>
                </form>
            </section>
        </section>
    )
}