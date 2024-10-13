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
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { info, type } = filterByToEdit
    return (
        <div className="search-area">
            <div className="tooltip">
                <button className="icon-button" aria-label="Search" onSubmit={onSubmitFilter}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <span className="tooltip-text">Search</span>
            </div>
            <input value={info}
                name="txt"
                type="text"
                onChange={handleChange}
                className="search-input-noute"
                placeholder="Search" />
            <div className="tooltip">
                <div className="select-wrapper">
                    <select id="type" name="type" value={type} className="hidden-select" onChange={handleChange}>
                        {/* <option value="">Select type</option> */}
                        <option value="">All types</option>
                        <option value="NoteTxt">Note text</option>
                        <option value="NoteImg">Image</option>
                        <option value="NoteTodos">To Do</option>
                    </select>
                    <button className="icon-button"  id="type" aria-label="Select type" onSubmit={onSubmitFilter}>
                        <i className="fa-solid fa-sliders"></i>
                    </button>
                    <span className="tooltip-text">Search</span>
                </div>
            </div>
        </div>
    )
}
