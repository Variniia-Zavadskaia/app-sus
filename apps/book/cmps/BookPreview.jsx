export function BookPreview({ book }) {
    
    function getDefaultUrl(ev) {
        ev.target.src = 'assets/img/defImg.jpeg'
    }
    const { listPrice } = book
    
    return (
        <article className="book-preview">
            <h2>{book.title}</h2>
            <img src={`${book.thumbnail}`} onError={getDefaultUrl} alt={book.title} />
            <p>
                <span className="bold-txt-book">Price:</span> {listPrice.amount}
            </p>
            <p>
                <span className="bold-txt-book">Currency:</span> {listPrice.currencyCode}
            </p>
            {listPrice.isOnSale && <img className="on-sale-icon" src="/assets/img/onSale.png" alt="" />}
        </article>
    )
}