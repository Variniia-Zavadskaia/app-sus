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
      <div className="mail-filter-container">
        <input type="text" placeholder="Search... " aria-label="Search Mail" />
        
      </div>
    </form>
  )
}
