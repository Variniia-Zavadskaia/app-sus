const {useState, useEffect} = React

export function MailFilter({filterBy, onSetFilterBy}) {
  const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({target}) {
    const {name, value, type, checked} = target

    if (type === 'checkbox') {
      // Handle checkboxes (isRead and sent)
      setFilterByToEdit((prev) => ({
        ...prev,
        [name]: checked,
      }))
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

  return (
    <form className="mail-filter">
      <input type="text" name="txt" value={filterBy.txt || ''} onChange={handleChange} placeholder="Search mails..." />
      <label>
        <input type="checkbox" name="isRead" checked={filterBy.isRead || false} onChange={handleChange} />
        Read
      </label>
      <label>
        <input type="checkbox" name="unread" checked={filterBy.unread || false} onChange={handleChange} />
        Unread
      </label>
      <label>
        <input type="checkbox" name="sent" checked={filterBy.sent || false} onChange={handleChange} />
        Sent Mails
      </label>
      <div className="sort-options">
        <label>
          <input
            type="checkbox"
            name="sortBy"
            value="date"
            checked={filterBy.sortBy === 'date'}
            onChange={handleChange}
          />
          Sort by Date
        </label>
        <label>
          <input
            type="checkbox"
            name="sortBy"
            value="title"
            checked={filterBy.sortBy === 'title'}
            onChange={handleChange}
          />
          Sort by Title
        </label>
      </div>
    </form>
  )
}
