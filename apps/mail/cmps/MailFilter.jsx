const {useState, useEffect} = React

export function MailFilter({filterBy, onSetFilterBy, filteredMails, updateMailStatus}) {
  const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortByDate, setSortByDate] = useState(false)
  const [sortByTitle, setSortByTitle] = useState(false)
  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({target}) {
    const {name, value, type, checked} = target

    if (type === 'checkbox') {
      setFilterByToEdit((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setFilterByToEdit((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  function handleStatusChange(eventOrValue) {
    const value = typeof eventOrValue === 'string' ? eventOrValue : eventOrValue.target.value
    setStatusFilter(value)

    setFilterByToEdit((prev) => ({
      ...prev,
      isRead: value === 'all' ? null : value === 'read', // `null` for all, `true` for read, `false` for unread
    }))

    if (value === 'date') {
      setSortByDate(true)
      setSortByTitle(false)
    } else if (value === 'title') {
      setSortByTitle(true)
      setSortByDate(false)
    } else {
      setSortByDate(false)
      setSortByTitle(false)
    }
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  function toggleMoreOptions() {
    setIsMoreOptionsOpen((prev) => !prev)
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
                autoComplete="off"
              />
              <button className="more-filter-option" onClick={toggleMoreOptions}>
                <i className="fa-solid fa-sliders" title="Show more search options"></i>
              </button>
            </div>
          </div>
        </label>
        {isMoreOptionsOpen && (
          <section className="more-options">
            <div className="sort-buttons">
              <button className={sortByDate ? 'sorted' : ''} type="button" onClick={() => handleStatusChange('date')}>
                Sort by Date
              </button>
              <button className={sortByTitle ? 'sorted' : ''} type="button" onClick={() => handleStatusChange('title')}>
                Sort by Title
              </button>
            </div>

            <div className="status-filter">
              <select name="status" value={statusFilter} onChange={handleStatusChange}>
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </section>
        )}
      </div>
    </form>
  )
}
