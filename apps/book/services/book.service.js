import { loadFromStorage, makeId, makeLorem, getRandomIntInclusive, saveToStorage } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const BOOK_KEY = 'bookDB'
const CACHE_STORAGE_KEY = 'googleBooksCache'
const gCache = loadFromStorage(CACHE_STORAGE_KEY) || {}
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    saveReview,
    removeReview,
    addGoogleBook,
    getEmptyBook,
    getDefaultFilter,
    getEmptyReview,
    getGoogleBooks,
    getCategoriesStats,
    getPriceStats,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY).then(books => {
        books = _getFilteredBooks(books, filterBy)
        return books
    })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId).then(book => _setNextPrevBookId(book))
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function addGoogleBook(book) {
    return storageService.post(BOOK_KEY, book, false)
}

function saveReview(bookId, reviewToSave) {
    return get(bookId).then(book => {
        const review = _createReview(reviewToSave)
        book.reviews.unshift(review)
        return save(book).then(() => review)
    })
}

function removeReview(bookId, reviewId) {
    return get(bookId).then(book => {
        const newReviews = book.reviews.filter((review) => review.id !== reviewId)
        book.reviews = newReviews
        return save(book)
    })
}

function getEmptyReview() {
    return {
        fullname: '',
        rating: 0,
        readAt: new Date().toISOString().slice(0, 10),
        txt: '',
        selected: 0,
    }
}

function _getFilteredBooks(books, filterBy) {
    if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        books = books.filter(book => regExp.test(book.title))
    }
    if (filterBy.maxPrice) {
        books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
    }
    if (filterBy.minPrice) {
        books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
    }
    if (filterBy.category) {
        books = books.filter(book => book.categories.includes(filterBy.category))
    }
    if (filterBy.isOnSale) {
        books = books.filter(book => book.listPrice.isOnSale)
    }

    return books
}

function getEmptyBook(title = '', amount = '', description = '', pageCount = '', language = 'en', authors = '') {
    return {
        title,
        authors,
        description,
        pageCount,
        thumbnail: `assets/img/defImg.jpeg`,
        language,
        listPrice: {
            amount,
            currencyCode: 'EUR',
            isOnSale: Math.random() > 0.7,
        },
        reviews: [],
    }
}

function getDefaultFilter() {
    return {
        title: '',
        minPrice: '',
    }
}

function getPriceStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByPriceMap = _getBookCountByPriceMap(books)
            const data = Object.keys(bookCountByPriceMap).map(priceName => ({ title: priceName, value: bookCountByPriceMap[priceName] }))
            return data
        })

}

function getCategoriesStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByCategoriesMap = _getBookCountByCategoriesMap(books)
            const data = Object.keys(bookCountByCategoriesMap)
                .map(categories =>
                ({
                    title: categories,
                    value: Math.round((bookCountByCategoriesMap[categories] / books.length) * 100)
                }))
            return data
        })
}

function getGoogleBooks(bookName) {
    if (bookName === '') return Promise.resolve()
    const googleBooks = gCache[bookName]
    if (googleBooks) {
        console.log('data from storage...', googleBooks)
        return Promise.resolve(googleBooks)
    }

    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
    return axios.get(url).then(res => {
        const data = res.data.items
        console.log('data from network...', data)
        const books = _formatGoogleBooks(data)
        gCache[bookName] = books
        utilService.saveToStorage(CACHE_STORAGE_KEY, gCache)
        return books
    })
}

function _formatGoogleBooks(googleBooks) {
    return googleBooks.map(googleBook => {
        const { volumeInfo } = googleBook
        const book = {
            id: googleBook.id,
            title: volumeInfo.title,
            description: volumeInfo.description,
            pageCount: volumeInfo.pageCount,
            authors: volumeInfo.authors,
            categories: volumeInfo.categories,
            publishedDate: volumeInfo.publishedDate,
            language: volumeInfo.language,
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: 'EUR',
                isOnSale: Math.random() > 0.7,
            },
            reviews: [],
        }
        if (volumeInfo.imageLinks) book.thumbnail = volumeInfo.imageLinks.thumbnail
        return book
    })
}

function _createBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = loadFromStorage(BOOK_KEY) || []
    if (books && books.length) return
    console.log('books', books)

    for (let i = 0; i < 20; i++) {
        const book = {
            id: makeId(),
            title: makeLorem(2),
            subtitle: makeLorem(4),
            authors: [makeLorem(1)],
            publishedDate: getRandomIntInclusive(1950, 2024),
            description: makeLorem(20),
            pageCount: getRandomIntInclusive(20, 600),
            categories: [ctgs[getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `assets/img/${i + 1}.jpg`,
            language: 'en',
            listPrice: {
                amount: getRandomIntInclusive(80, 500),
                currencyCode: 'EUR',
                isOnSale: Math.random() > 0.7,
            },
            reviews: [],
        }
        books.push(book)
    }
    saveToStorage(BOOK_KEY, books)
    console.log('books', books)
}

function _createReview(reviewToSave) {
    return {
        id: utilService.makeId(),
        ...reviewToSave,
    }
}

function _setNextPrevBookId(book) {
    return query().then(books => {
        const bookIdx = books.findIndex(currBook => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function _getBookCountByPriceMap(books) {
    const bookCountByPriceMap = books.reduce((map, book) => {
        if (book.listPrice.amount < 120) map.cheap++
        else if (book.listPrice.amount < 200) map.normal++
        else map.expensive++
        return map
    }, { slow: 0, normal: 0, fast: 0 })
    return bookCountByPriceMap
}

function _getBookCountByCategoriesMap(books) {
    const bookCountByCategoriesMap = books.reduce((map, book) => {
        if (!map[book.categories]) map[book.categories] = 0
        map[book.categories]++
        return map
    }, {})
    return bookCountByCategoriesMap
}

