const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        // Notify parent
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { info } = filterByToEdit
    return (
        <div className="search-area">
            <div className="tooltip">
                <button className="icon-button" aria-label="Search" onSubmit={onSubmitFilter}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <span className="tooltip-text">Search</span>
            </div>
            <input value={info}
                type="text"
                onChange={handleChange}
                className="search-input"
                placeholder="Search" />
        </div>
    )
}