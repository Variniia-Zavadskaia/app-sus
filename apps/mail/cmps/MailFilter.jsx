const {useState, useEffect} = React

export function MailFilter({filterBy, onSetFilterBy}) {
  const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({target}) {
    console.log('target', target)

    const {name, value, type, checked} = target

    if (type === 'checkbox') {
      // Handle checkboxes (isRead and sent)
      if (name === 'sortBy') {
        // For sortBy, clear previous selection
        setFilterByToEdit((prev) => ({
          ...prev,
          sortBy: prev.sortBy === value ? null : value, // Toggle selection
        }))
      } else {
        setFilterByToEdit((prev) => ({
          ...prev,
          [name]: checked,
        }))
      }
    } else {
      // Handle text input
      setFilterByToEdit((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  return (
    <form className="mail-filter-container" onSubmit={onSubmit}>
      <div className="mail-filter">
        <label htmlFor="search">
          <div className="wrapper">
            <button className="search-icon" onClick={handleChange} title="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <div className="search-input">
              <input
                type="text"
                id="search"
                placeholder="Search mails..."
                onChange={(ev) => onSetFilterBy({search: ev.target.value})}
              />
              <button className="more-filter-option">
                <i className="fa-solid fa-sliders" title="Show more search options"></i>
              </button>
            </div>
          </div>
        </label>
      </div>
    </form>
  )
}
