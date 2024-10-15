const { useState, useEffect, useRef } = React

import { bookService } from '../services/book.service.js'
import { TextboxRating } from './TextboxRating.jsx'
import { StarRating } from './dynamic-inputs/StarRating.jsx'
// import { SelectRating } from './dynamic-inputs/SelectRating.jsx'

export function AddReview({ saveReview, toggleReview }) {
    const [review, setReview] = useState(bookService.getEmptyReview())
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    function onAddReview(ev) {
        ev.preventDefault()
        console.log("lll");
        
        saveReview(review)
        toggleReview()
    }

    function handleChange({ target }) {
        const { value, name: prop } = target
        setReview((prevReview) => ({ ...prevReview, [prop]: value }))
    }

    const { fullName, readAt, txt, rating } = review
    return (
        <section className="review-add">
            {/* <h3>Add Review</h3> */}
            <form onSubmit={onAddReview} className="review-form">
                <div className="review-modal">
                    <h1>Add review</h1>
                    <button className="btn-toggle-modal add-rev" onClick={toggleReview}>
                        X
                    </button>
                    <label className="bold-txt-book" htmlFor="fullname">
                        Full Name:
                    </label>

                    <input
                        autoFocus
                        ref={inputRef}
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={fullName}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Enter your full name"
                        required
                    />

                    <label className='bold-txt-book' htmlFor="readAt"> Read At:</label>
                    <input type="date" name="readAt" value={readAt} onChange={handleChange} required />

                    <StarRating handleChange={handleChange} rating={rating} />
                    {/* <SelectRating handleChange={handleChange} rating={rating} /> */}
                    <TextboxRating handleChange={handleChange} txt={txt} />
                    <button className='save-review'>Save</button>

                    

                </div>
            </form>
        </section>
    )
}