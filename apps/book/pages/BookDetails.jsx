const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { LongTxt } from '../cmps/LongTxt.jsx'
import { AddReview } from '../cmps/AddReview.jsx'
import { ReviewList } from "../cmps/ReviewList.jsx";
import { AppLoader } from '../../../cmps/AppLoader.jsx'


export function BookDetails() {
    const [book, setBook] = useState(null)
    const [features, setFeatures] = useState({ level: '', ageCategory: '', priceClass: '' })
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingReview, setIsLoadingReview] = useState(false)
    const [isShowReviewModal, setIsShowReviewModal] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        setIsLoading(true)
        bookService
            .get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book', err)
                showErrorMsg('Could not load book. Please try again.')
                navigate('/book')
            })
    }

    useEffect(() => {
        if (!book) return
        const featuresFromBook = {
            level: getReadingLevel(book.pageCount),
            ageCategory: getBookAgeCategory(book.publishedDate),
            priceClass: getPriceClass(book.listPrice.amount),
        }

        console.log(featuresFromBook)

        setFeatures(prev => ({ ...prev, ...featuresFromBook }))
    }, [book])

    const getReadingLevel = pageCount => {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Decent Reading'
        if (pageCount < 100) return 'Light Reading'
        return 'Moderate Reading'
    }

    const getBookAgeCategory = publishedDate => {
        const publishedYear = new Date(publishedDate).getFullYear()
        const currentYear = new Date().getFullYear()
        const age = currentYear - publishedYear

        if (age > 10) return 'Vintage'
        if (age < 1) return 'New'
        return 'Modern'
    }

    const getPriceClass = amount => {
        if (amount > 200) return 'price-red'
        if (amount < 50) return 'price-green'
        return 'price-normal'
    }

    function getCurrencySymbol(currencyCode) {
        const currencySymbols = {
            USD: '$',
            EUR: '€',
            ILS: '₪',
            GBP: '£',
            JPY: '¥',
            AUD: 'A$',
            CAD: 'C$',
            CHF: 'Fr',
            CNY: '¥',
            SEK: 'kr',
            NZD: 'NZ$',
        }
        return currencySymbols[currencyCode] || currencyCode // Fallback to currency code if symbol is not found
    }

    function onToggleReviewModal() {
        setIsShowReviewModal(prevIsReviewModal => !prevIsReviewModal)
    }

    function onSaveReview(reviewToAdd) {
        console.log('jjjjj');
        
        bookService
            .saveReview(book.id, reviewToAdd)
            .then(review => {
                const reviews = [review, ...book.reviews]
                setBook({ ...book, reviews })
                showSuccessMsg(`Review added successfully!`)
            })
            .catch(err => {
                console.error('Error adding review:', err)

                showErrorMsg(`Failed to add review. Please try again`)
            })
            .finally(() => setIsLoadingReview(false))
    }

    function onRemoveReview(reviewId) {
        setIsLoadingReview(true)
        bookService
            .removeReview(book.id, reviewId)
            .then(() => {
                const filteredReviews = book.reviews.filter(review => review.id !== reviewId)
                setBook({ ...book, reviews: filteredReviews })
                showSuccessMsg(`Review removed successfully!`)
            }) // Update state after deletion
            .catch(err => {
                console.error('Error deleting review:', err)
                showErrorMsg(`Problems removing review (${reviewId})`)
            })
            .finally(() => setIsLoadingReview(false))
    }

    function getDefaultUrl(ev) {
        ev.target.src = 'assets/img/defImg.jpeg'
    }

    // function onBack() {
    //     navigate('/book')
    // }

    if (!book) return <AppLoader />

    return (
        <article className="book-details">
            <nav className="book-details-nav">
                <Link to={`/book/${book.prevBookId}`}>
                    <button className='add-rev'>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                </Link>
                <Link to={`/book/${book.nextBookId}`}>
                    <button className='add-rev'>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </Link>
            </nav>

            <h2 className="book-title">{book.title}</h2>
            <span className="bold-txt-book">{features.ageCategory}</span>
            <img
                className="book-thumbnail"
                src={`${book.thumbnail} `}
                onError={getDefaultUrl}
                alt={`${book.title} cover`}
            />

            <p className={`book-price ${features.priceClass}`}>
                <span className="bold-txt-book">Price: </span> {book.listPrice.amount}{' '}
                {getCurrencySymbol(book.listPrice.currencyCode)}
            </p>

            <p>
                <span className="bold-txt-book">Language:</span>
                {book.language}
            </p>

            {book.categories && (
                <p>
                    <span className="bold-txt-book">Categoric:</span> {book.categories}
                </p>
            )}
            {book.authors && (
                <p>
                    <span className="bold-txt-book">Authors:</span> {book.authors}
                </p>
            )}

            {book.description && <LongTxt txt={book.description} />}
            {book.listPrice.isOnSale && (
                <img className="on-sale-icon" src="/assets/img/onSale.png" alt="" />
            )}
            <button className="close-book">
                <Link to="/book"><i className="fa-solid fa-xmark"></i></Link>
            </button>
            <div className="brake-line"></div>
            <button className='add-rev' onClick={onToggleReviewModal}>Add Review</button>
            {isShowReviewModal && (
                <AddReview
                    toggleReview={onToggleReviewModal}
                    saveReview={onSaveReview}
                />
            )}

            <div className='review-container'>
                {!isLoadingReview
                    ? <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />
                    : <div className="loader"></div>
                }
            </div>
        </article>
    )
}
